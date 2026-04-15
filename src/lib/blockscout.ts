const BLOCKSCOUT = 'https://base.blockscout.com/api';
const BASE_RPC = 'https://mainnet.base.org';

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([
    promise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ]);
}

export interface TxInfo {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  contractAddress: string;
  isError: string;
  input: string;
}

export interface WalletStats {
  txCount: number;
  firstTxTimestamp: number | null;
  lastTxTimestamp: number | null;
  ethBalance: bigint;
  uniqueContracts: number;
  errorRate: number;
  hasRecentActivity: boolean; // within 7 days
  walletAgeDays: number;
  daysSinceLastTx: number;
}

export async function fetchWalletStats(address: string): Promise<WalletStats> {
  const [txRes, balanceRes] = await Promise.allSettled([
    withTimeout(
      fetch(
        `${BLOCKSCOUT}?module=account&action=txlist&address=${address}&page=1&offset=100&sort=desc`,
        { cache: 'no-store' }
      )
        .then((r) => r.text())
        .then((text) => {
          const json = JSON.parse(text) as { status?: string; result?: TxInfo[] };
          if (json.status !== '1' || !Array.isArray(json.result)) return null;
          return json.result;
        }),
      8000
    ),
    withTimeout(
      fetch(BASE_RPC, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [address, 'latest'],
        }),
        cache: 'no-store',
      })
        .then((r) => r.json())
        .then((j: { result?: string }) => (j.result ? BigInt(j.result) : 0n)),
      5000
    ),
  ]);

  const txs = txRes.status === 'fulfilled' && txRes.value ? txRes.value : [];
  const ethBalance =
    balanceRes.status === 'fulfilled' && balanceRes.value != null
      ? balanceRes.value
      : 0n;

  const now = Math.floor(Date.now() / 1000);

  if (txs.length === 0) {
    return {
      txCount: 0,
      firstTxTimestamp: null,
      lastTxTimestamp: null,
      ethBalance,
      uniqueContracts: 0,
      errorRate: 0,
      hasRecentActivity: false,
      walletAgeDays: 0,
      daysSinceLastTx: 999,
    };
  }

  // sort=desc: txs[0] is most recent, txs[last] is oldest in the fetched batch
  const lastTxTimestamp = parseInt(txs[0].timeStamp);
  const firstTxTimestamp = parseInt(txs[txs.length - 1].timeStamp);
  const walletAgeDays = Math.floor((now - firstTxTimestamp) / 86400);
  const daysSinceLastTx = Math.floor((now - lastTxTimestamp) / 86400);

  const uniqueContracts = new Set(
    txs
      .filter((tx) => tx.to && tx.to !== '' && tx.input && tx.input !== '0x')
      .map((tx) => tx.to.toLowerCase())
  ).size;

  const errorCount = txs.filter((tx) => tx.isError === '1').length;
  const errorRate = txs.length > 0 ? errorCount / txs.length : 0;

  return {
    txCount: txs.length,
    firstTxTimestamp,
    lastTxTimestamp,
    ethBalance,
    uniqueContracts,
    errorRate,
    hasRecentActivity: daysSinceLastTx <= 7,
    walletAgeDays,
    daysSinceLastTx,
  };
}

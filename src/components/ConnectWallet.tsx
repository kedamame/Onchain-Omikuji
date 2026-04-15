'use client';

import { useConnect, type Connector } from 'wagmi';

interface Props {
  isInMiniApp: boolean;
}

export function ConnectWallet({ isInMiniApp }: Props) {
  const { connect, connectors, isPending, variables } = useConnect();

  // In Farcaster miniapp: auto-connect silently
  if (isInMiniApp) {
    const fc = connectors.find((c) => c.id === 'farcasterMiniApp');
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-xs">
        <div className="flex gap-8 mb-2">
          <Lantern delay="0s" />
          <Lantern delay="0.4s" />
          <Lantern delay="0.8s" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-mincho text-ink text-base leading-relaxed">
            Connect your wallet to reveal<br />
            <span className="text-crimson font-bold">your fortune</span>
          </p>
          <p className="font-gothic text-ink/40 text-xs">
            We analyze your Base chain activity
          </p>
        </div>
        <PrimaryButton
          onClick={() => fc && connect({ connector: fc })}
          isPending={isPending}
          label="Draw Your Omikuji"
        />
        <p className="font-gothic text-ink/30 text-xs text-center">
          Signature only. No transaction required.
        </p>
      </div>
    );
  }

  // Browser: show individual wallet options
  // Filter out farcasterMiniApp; deduplicate by name to avoid double-listing EIP-6963 wallets
  const seen = new Set<string>();
  const displayConnectors = connectors.filter((c) => {
    if (c.id === 'farcasterMiniApp') return false;
    const key = c.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      <div className="flex gap-8 mb-2">
        <Lantern delay="0s" />
        <Lantern delay="0.4s" />
        <Lantern delay="0.8s" />
      </div>

      <div className="text-center space-y-2">
        <p className="font-mincho text-ink text-base leading-relaxed">
          Connect your wallet to reveal<br />
          <span className="text-crimson font-bold">your fortune</span>
        </p>
        <p className="font-gothic text-ink/40 text-xs">
          We analyze your Base chain activity
        </p>
      </div>

      {/* Wallet list */}
      <div className="flex flex-col gap-2 w-full">
        {displayConnectors.map((connector) => (
          <WalletButton
            key={connector.id}
            connector={connector}
            isPending={isPending && variables?.connector === connector}
            onConnect={() => connect({ connector })}
          />
        ))}
      </div>

      <p className="font-gothic text-ink/30 text-xs text-center">
        Signature only. No transaction required.
      </p>
    </div>
  );
}

/* ── Wallet Button ── */
interface WalletButtonProps {
  connector: Connector;
  isPending: boolean;
  onConnect: () => void;
}

function WalletButton({ connector, isPending, onConnect }: WalletButtonProps) {
  const { name, icon } = getWalletDisplay(connector);

  return (
    <button
      onClick={onConnect}
      disabled={isPending}
      className="
        relative flex items-center gap-3 w-full px-4 py-3
        bg-scroll hover:bg-paper-dark
        border border-ink/12 hover:border-crimson/30
        rounded-sm transition-all duration-150
        disabled:opacity-50 active:scale-[0.98]
        shadow-sm
      "
    >
      {/* Wallet icon */}
      <div className="w-8 h-8 rounded-full border border-ink/10 bg-paper flex items-center justify-center flex-shrink-0 overflow-hidden">
        {isPending ? (
          <span className="w-4 h-4 border-2 border-crimson border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt={name} width={24} height={24} className="rounded-full" />
        ) : (
          <WalletPlaceholderIcon connectorId={connector.id} />
        )}
      </div>

      {/* Name */}
      <span className="font-gothic text-ink text-sm font-bold flex-1 text-left">
        {isPending ? 'Connecting...' : name}
      </span>

      {/* Arrow */}
      {!isPending && (
        <svg className="w-4 h-4 text-ink/30" fill="none" viewBox="0 0 16 16">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      {/* Corner ornaments on hover */}
      <span className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-crimson/20" />
      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-crimson/20" />
      <span className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-crimson/20" />
      <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-crimson/20" />
    </button>
  );
}

/* ── Primary Button (Farcaster miniapp) ── */
function PrimaryButton({
  onClick,
  isPending,
  label,
}: {
  onClick: () => void;
  isPending: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className="
        relative w-full py-4 px-8
        bg-crimson hover:bg-crimson-dark
        text-scroll font-mincho font-bold text-lg
        rounded-sm transition-all duration-200
        disabled:opacity-60
        shadow-lg shadow-crimson/30
        border-2 border-crimson-dark/30
        active:scale-95
      "
    >
      {isPending ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-scroll border-t-transparent rounded-full animate-spin" />
          Connecting...
        </span>
      ) : (
        label
      )}
      <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-scroll/60" />
      <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-scroll/60" />
      <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-scroll/60" />
      <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-scroll/60" />
    </button>
  );
}

/* ── Wallet display helpers ── */
function getWalletDisplay(connector: Connector): { name: string; icon: string | undefined } {
  // EIP-6963 injected providers supply their own icon
  if (connector.icon) return { name: connector.name, icon: connector.icon };

  switch (connector.id) {
    case 'coinbaseWalletSDK':
      return { name: 'Coinbase Wallet', icon: undefined };
    case 'walletConnect':
      return { name: 'WalletConnect', icon: undefined };
    case 'injected':
      return { name: connector.name ?? 'Browser Wallet', icon: undefined };
    default:
      return { name: connector.name, icon: undefined };
  }
}

/* ── Placeholder icon when no image is available ── */
function WalletPlaceholderIcon({ connectorId }: { connectorId: string }) {
  if (connectorId === 'coinbaseWalletSDK') {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
        <circle cx="16" cy="16" r="16" fill="#0052FF" />
        <path
          d="M16 8a8 8 0 1 0 0 16A8 8 0 0 0 16 8zm-2.5 5.5h5a.5.5 0 0 1 0 1H14v3h4.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z"
          fill="white"
        />
        <rect x="13.5" y="13.5" width="5" height="5" rx="1.5" fill="white" />
      </svg>
    );
  }
  if (connectorId === 'walletConnect') {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
        <circle cx="16" cy="16" r="16" fill="#3B99FC" />
        <path
          d="M9.6 13.2c3.5-3.5 9.3-3.5 12.8 0l.4.4c.2.2.2.5 0 .7l-1.4 1.4c-.1.1-.3.1-.4 0l-.6-.6c-2.5-2.5-6.5-2.5-9 0l-.6.6c-.1.1-.3.1-.4 0l-1.4-1.4c-.2-.2-.2-.5 0-.7l.6-.4zm15.8 3.8-1.2 1.2c-.2.2-.5.2-.7 0l-2.6-2.6c-.1-.1-.3-.1-.4 0l-2.6 2.6c-.2.2-.5.2-.7 0l-2.6-2.6c-.1-.1-.3-.1-.4 0l-2.6 2.6c-.2.2-.5.2-.7 0L7.2 17c-.2-.2-.2-.5 0-.7l1.2-1.2 8.4-8.4c.2-.2.5-.2.7 0l8 8 .1 1.3-.2.0z"
          fill="white"
        />
      </svg>
    );
  }
  // Generic browser wallet
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="16" fill="#E8E3D8" />
      <rect x="8" y="10" width="16" height="12" rx="2" stroke="#1A1434" strokeWidth="1.5" fill="none" />
      <path d="M8 14h16" stroke="#1A1434" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1.5" fill="#1A1434" />
    </svg>
  );
}

/* ── Lantern ── */
function Lantern({ delay }: { delay: string }) {
  return (
    <div
      className="animate-float flex flex-col items-center"
      style={{ animationDelay: delay }}
    >
      <div className="w-px h-3 bg-ink/30" />
      <div className="relative w-7 h-10 bg-crimson rounded-full border-2 border-crimson-dark/40 shadow-md shadow-crimson/40 flex items-center justify-center">
        <div className="w-px h-6 bg-scroll/30 absolute" />
        <div className="h-px w-4 bg-scroll/30 absolute top-2" />
        <div className="h-px w-4 bg-scroll/30 absolute bottom-2" />
        <div className="absolute inset-0 rounded-full bg-gold/20 blur-sm" />
      </div>
      <div className="w-px h-3 bg-gold/60" />
      <div className="flex gap-0.5">
        <div className="w-px h-2 bg-gold/60" />
        <div className="w-px h-3 bg-gold/60" />
        <div className="w-px h-2 bg-gold/60" />
      </div>
    </div>
  );
}

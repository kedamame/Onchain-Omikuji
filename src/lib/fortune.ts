import type { WalletStats } from './blockscout';

export type FortuneGrade = '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶';

export interface FortuneResult {
  grade: FortuneGrade;
  gradeEn: string;
  color: string;
  bgColor: string;
  headline: string;
  body: string;
  details: FortuneDetail[];
  score: number;
}

export interface FortuneDetail {
  label: string;
  value: string;
  icon: string;
  good: boolean | null;
}

const GRADE_CONFIG: Record<FortuneGrade, { gradeEn: string; color: string; bgColor: string }> = {
  大吉: { gradeEn: 'GREAT LUCK', color: '#C8102E', bgColor: '#FFF5F5' },
  吉:   { gradeEn: 'GOOD LUCK',  color: '#B8860B', bgColor: '#FFFBF0' },
  中吉: { gradeEn: 'MILD LUCK',  color: '#2D6A4F', bgColor: '#F0FAF5' },
  小吉: { gradeEn: 'SMALL LUCK', color: '#457B9D', bgColor: '#F0F7FF' },
  末吉: { gradeEn: 'FUTURE LUCK', color: '#6B4C8A', bgColor: '#F8F0FF' },
  凶:   { gradeEn: 'CAUTION',    color: '#3D2B5E', bgColor: '#F5F0FF' },
};

const HEADLINES: Record<FortuneGrade, string[]> = {
  大吉: [
    'The onchain gods smile upon you. Great fortune descends.',
    'Vibrant soul — on the land of Base, your fate shines brilliantly.',
  ],
  吉: [
    'Steady steps invite certain luck.',
    'Each transaction laid with care lights the path to good fortune.',
  ],
  中吉: [
    'A calm tide. Yet one bold step forward reveals the light.',
    'In quiet waves, the seeds of opportunity are growing.',
  ],
  小吉: [
    'Small connections lead to greater ones in time.',
    'A season of sprouting. Lay your roots patiently.',
  ],
  末吉: [
    'Now is the time to sow. A great bloom awaits.',
    'Fortune that broadens with time — the upward turn begins here.',
  ],
  凶: [
    'The calm before the storm. Yet a turning point will surely come.',
    'Gather your inner strength now. The next wave is on its way.',
  ],
};

const BODIES: Record<FortuneGrade, string[]> = {
  大吉: [
    'Your onchain activity is remarkably vibrant. Deeply engaged with many contracts, you are rooted in the Base ecosystem. Keep this momentum and further growth is all but certain.',
    'The energy in your wallet calls in great luck. Consistent action and rich experience have guided you to the highest fortune.',
  ],
  吉: [
    'A well-balanced onchain presence brings stable fortune. Your steady accumulation is the foundation of genuine luck.',
    'Moderate activity and a solid track record are drawing good fortune toward you. Maintain this pace for continued progress.',
  ],
  中吉: [
    'Modest onchain activity is visible. Engaging with a broader range of contracts will lift your fortune further.',
    'A mid-range level of activity points to mild luck. Face new challenges without fear — bold moves will prove fortunate.',
  ],
  小吉: [
    'Your onchain journey is unhurried, yet steadily moving forward. Continue at your own pace — patience is your strength.',
    'There is plenty of room to grow. Exploring new protocols and features will turn your fortune upward.',
  ],
  末吉: [
    'Activity is light, but the real chapter is just beginning. Believe in the broadening fortune and advance one step at a time.',
    'The time has come to wake your wallet. Starting with a single small action sets destiny in motion.',
  ],
  凶: [
    'Onchain activity is scarce. Yet every journey begins somewhere — now is the perfect moment to take your first step.',
    'The current tide is challenging, but there is no need for despair. Entering the onchain world can change your fortune entirely.',
  ],
};

function scoreWallet(stats: WalletStats): number {
  let score = 0;

  // txCount (0-30 points)
  if (stats.txCount === 0) score += 0;
  else if (stats.txCount < 5) score += 8;
  else if (stats.txCount < 20) score += 16;
  else if (stats.txCount < 50) score += 22;
  else if (stats.txCount < 100) score += 28;
  else score += 30;

  // wallet age (0-20 points)
  if (stats.walletAgeDays < 7) score += 4;
  else if (stats.walletAgeDays < 30) score += 8;
  else if (stats.walletAgeDays < 90) score += 14;
  else if (stats.walletAgeDays < 365) score += 18;
  else score += 20;

  // recency (0-20 points)
  if (stats.daysSinceLastTx <= 1) score += 20;
  else if (stats.daysSinceLastTx <= 7) score += 16;
  else if (stats.daysSinceLastTx <= 30) score += 10;
  else if (stats.daysSinceLastTx <= 90) score += 5;
  else score += 0;

  // contract diversity (0-15 points)
  if (stats.uniqueContracts === 0) score += 0;
  else if (stats.uniqueContracts < 3) score += 5;
  else if (stats.uniqueContracts < 10) score += 10;
  else score += 15;

  // ETH balance (0-10 points)
  const ethWei = stats.ethBalance;
  if (ethWei > 1000000000000000000n) score += 10;      // > 1 ETH
  else if (ethWei > 100000000000000000n) score += 7;   // > 0.1 ETH
  else if (ethWei > 10000000000000000n) score += 4;    // > 0.01 ETH
  else if (ethWei > 0n) score += 2;
  else score += 0;

  // error rate penalty (-5 to 0)
  if (stats.errorRate > 0.3) score -= 5;
  else if (stats.errorRate > 0.1) score -= 2;

  return Math.max(0, Math.min(100, score));
}

function gradeFromScore(score: number): FortuneGrade {
  if (score >= 85) return '大吉';
  if (score >= 70) return '吉';
  if (score >= 55) return '中吉';
  if (score >= 40) return '小吉';
  if (score >= 25) return '末吉';
  return '凶';
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

function formatBalance(wei: bigint): string {
  const eth = Number(wei) / 1e18;
  if (eth === 0) return '0 ETH';
  if (eth < 0.001) return '< 0.001 ETH';
  return `${eth.toFixed(4)} ETH`;
}

export function calculateFortune(stats: WalletStats, address: string): FortuneResult {
  const score = scoreWallet(stats);
  const grade = gradeFromScore(score);
  const config = GRADE_CONFIG[grade];

  // Use address as seed for message selection
  const seed = parseInt(address.slice(2, 6), 16);

  const headline = pick(HEADLINES[grade], seed);
  const body = pick(BODIES[grade], seed + 1);

  const details: FortuneDetail[] = [
    {
      label: 'Wallet Age',
      value: stats.walletAgeDays === 0 ? 'New' : `${stats.walletAgeDays} days`,
      icon: '🏮',
      good: stats.walletAgeDays > 30,
    },
    {
      label: 'Last Tx',
      value: stats.daysSinceLastTx >= 999
        ? 'None'
        : stats.daysSinceLastTx === 0
        ? 'Today'
        : `${stats.daysSinceLastTx}d ago`,
      icon: '🌊',
      good: stats.daysSinceLastTx <= 7,
    },
    {
      label: 'Contracts Used',
      value: `${stats.uniqueContracts}`,
      icon: '🎋',
      good: stats.uniqueContracts >= 5,
    },
    {
      label: 'ETH Balance',
      value: formatBalance(stats.ethBalance),
      icon: '⛩',
      good: stats.ethBalance > 10000000000000000n,
    },
    {
      label: 'Success Rate',
      value: stats.txCount === 0 ? '—' : `${Math.round((1 - stats.errorRate) * 100)}%`,
      icon: '🎑',
      good: stats.errorRate < 0.1,
    },
  ];

  return {
    grade,
    gradeEn: config.gradeEn,
    color: config.color,
    bgColor: config.bgColor,
    headline,
    body,
    details,
    score,
  };
}

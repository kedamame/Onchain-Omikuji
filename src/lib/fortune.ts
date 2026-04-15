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
    'The stars of the blockchain align. This is your season of triumph.',
    'Fortune overflows from every block. You are blessed beyond measure.',
    'A warrior of the chain — your record speaks of destiny fulfilled.',
    'The ancient ledger sings your name. Great luck has chosen you.',
    'Roots run deep, branches reach high. Your onchain tree bears the finest fruit.',
    'Heaven and chain move as one. This is the moment of your flourishing.',
  ],
  吉: [
    'Steady steps invite certain luck.',
    'Each transaction laid with care lights the path to good fortune.',
    'The tide is with you. Sail forward without hesitation.',
    'Good fortune follows those who show up consistently.',
    'Your wallet tells a story of quiet discipline — and luck rewards it.',
    'The path is clear, the wind is kind. Press on.',
    'A merchant who moves with patience always finds the best trade.',
    'Fortune flows where intention meets action. You have found that current.',
  ],
  中吉: [
    'A calm tide. Yet one bold step forward reveals the light.',
    'In quiet waves, the seeds of opportunity are growing.',
    'Neither storm nor drought — a season of steady promise.',
    'The middle path holds hidden wisdom. Walk it with courage.',
    'Good fortune is within reach. Stretch a little further.',
    'The chrysanthemum blooms in its own time. Yours is nearly here.',
    'Between stillness and motion, luck waits for the one who dares.',
    'Your chain whispers of potential not yet fully realized. Listen closely.',
  ],
  小吉: [
    'Small connections lead to greater ones in time.',
    'A season of sprouting. Lay your roots patiently.',
    'The bamboo bends, but does not break. Small luck is still luck.',
    'Every great builder began with a single block. You have begun.',
    'Fortune smiles quietly from a distance — invite it closer.',
    'A small candle still drives away the dark. Your light is growing.',
    'The seed is planted. Water it with curiosity and watch what grows.',
    'Modest beginnings harbor extraordinary ends. Trust the process.',
  ],
  末吉: [
    'Now is the time to sow. A great bloom awaits.',
    'Fortune that broadens with time — the upward turn begins here.',
    'The road ahead is longer than the road behind. Set forth.',
    'A winter always precedes a spring. Your thaw is coming.',
    'The first star of evening is not the last. Better fortune is rising.',
    'Potential sleeps within you like an ember. One breath can ignite it.',
    'The journey of a thousand blocks begins with a single transaction.',
    'Luck is not absent — it is merely waiting for you to knock.',
  ],
  凶: [
    'The calm before the storm. Yet a turning point will surely come.',
    'Gather your inner strength now. The next wave is on its way.',
    'Even the lowest tide reveals ground on which to stand and rebuild.',
    'The mountain looks tallest before you begin to climb.',
    'Silence on the chain is not failure — it is the pause before the leap.',
    'From stillness, the greatest movements are born. Your time is near.',
    'The fortune wheel turns without ceasing. Down today, up tomorrow.',
    'Even in shadow, the roots of a great tree are quietly growing.',
  ],
};

const BODIES: Record<FortuneGrade, string[]> = {
  大吉: [
    'Your onchain activity is remarkably vibrant. Deeply engaged with many contracts, you are rooted in the Base ecosystem. Keep this momentum and further growth is all but certain.',
    'The energy in your wallet calls in great luck. Consistent action and rich experience have guided you to the highest fortune.',
    'Few wallets tell a story as vivid as yours. Your history on Base radiates intention, diversity, and commitment. The chain knows who its veterans are.',
    'You have touched many contracts, crossed many protocols, and kept your streak alive. This is not luck — this is the reward for showing up, day after day.',
    'An elder of the Base chain. Your experience is etched into the ledger forever, and fortune acknowledges the depth of your journey.',
    'Great luck does not fall from the sky — it is mined by those who act. Your recent transactions prove you are exactly that kind of builder.',
    'The balance of your wallet reflects the balance of your spirit. You have cultivated something rare: consistency in a world of noise.',
    'Like a temple that has stood through every season, your wallet endures. The gods of the chain reward such steadfastness with the highest blessing.',
  ],
  吉: [
    'A well-balanced onchain presence brings stable fortune. Your steady accumulation is the foundation of genuine luck.',
    'Moderate activity and a solid track record are drawing good fortune toward you. Maintain this pace for continued progress.',
    'Not too hasty, not too still — your rhythm on Base is exactly right. Good fortune recognizes balance and chooses to dwell near it.',
    'Your transactions speak of thoughtfulness. You do not chase every trend, but you are never absent when it matters. This wisdom invites good luck.',
    'The ledger of your recent activity is clean and purposeful. Fortune favors the prepared, and you have prepared well.',
    'Good luck arrives for those who are present. Your consistent engagement with Base marks you as someone the chain can rely on.',
    'Like a well-tended garden, your wallet shows signs of careful cultivation. The harvest will be good — perhaps even great.',
    'Your onchain story is one of discipline and curiosity in harmony. That is a rare combination, and fortune takes notice of rare things.',
  ],
  中吉: [
    'Modest onchain activity is visible. Engaging with a broader range of contracts will lift your fortune further.',
    'A mid-range level of activity points to mild luck. Face new challenges without fear — bold moves will prove fortunate.',
    'Your wallet shows promise, like a river that has not yet found its full course. A little more exploration will reveal the way.',
    'The foundation is here. What you have built on Base is solid, but the upper floors are waiting. Fortune is the reward for those who keep building.',
    'You have taken meaningful steps on the chain, yet there is clearly more ahead. The next move you make may well be the defining one.',
    'Mild luck does not mean small luck. It means that fortune is watching carefully, weighing your next decision. Choose boldly.',
    'Your activity suggests a thoughtful traveler who has not yet reached the destination. Press onward — the view from the summit is worth it.',
    'Between the spark and the flame lies patience. Your recent onchain moves hint at a fire that is still gathering strength.',
  ],
  小吉: [
    'Your onchain journey is unhurried, yet steadily moving forward. Continue at your own pace — patience is your strength.',
    'There is plenty of room to grow. Exploring new protocols and features will turn your fortune upward.',
    'Small luck is a quiet gift. It asks only that you continue — one transaction at a time, one day at a time.',
    'The chain has noticed you, even if just barely. That noticing is the beginning of something. Do not disappear.',
    'Your wallet is a young tree in an old forest. Give it sunlight — more interactions, more curiosity — and it will grow tall.',
    'Fortune has left a small flame at your door. Do not let it go out. Each new interaction feeds it a little more.',
    'The first steps of any great journey are often the smallest. What matters is that you have started. Keep walking.',
    'A small harvest this season, but the soil is good. With a bit more tending, the next season can be abundant.',
  ],
  末吉: [
    'Activity is light, but the real chapter is just beginning. Believe in the broadening fortune and advance one step at a time.',
    'The time has come to wake your wallet. Starting with a single small action sets destiny in motion.',
    'Future luck is still luck — and it is yours to claim. The chain is patient. It will wait for you to return.',
    'Your wallet rests at the threshold between absence and presence. One meaningful step will shift everything.',
    'The omikuji sees potential in you that your recent activity has not yet shown. There is a spark here — fan it.',
    'Not yet in bloom, but the roots are alive. Fortune deferred is not fortune denied. Your time is simply still ahead.',
    'The tide of the chain has not yet reached you, but it is moving in your direction. Prepare the shore.',
    'Even a dormant volcano holds tremendous power within. What lies sleeping in your wallet may yet reshape the landscape.',
  ],
  凶: [
    'Onchain activity is scarce. Yet every journey begins somewhere — now is the perfect moment to take your first step.',
    'The current tide is challenging, but there is no need for despair. Entering the onchain world can change your fortune entirely.',
    'The chain sees an absence where there could be a presence. This is not a verdict — it is an invitation. Come and write your story.',
    'Caution is a wise companion, but even the cautious must move eventually. The best time to begin was yesterday. The next best time is now.',
    'A blank page frightens no great writer. Your onchain story is waiting to be written — pick up the pen.',
    'The omikuji draws caution, not condemnation. Fortune has not left you — it has simply not found you yet. Make yourself easier to find.',
    'There is no shame in starting from the beginning. Every legend on this chain was once a wallet with zero transactions.',
    'Dark fortune is a map, not a destination. It shows where you are, not where you must stay. The path forward is open.',
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

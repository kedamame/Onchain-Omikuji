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
    'オンチェーンの神が微笑む。大いなる運気がそなたに降り注ぐ。',
    '活発なる魂よ。Baseの大地で、運命は燦然と輝く。',
  ],
  吉: [
    '堅実なる歩みが、確かな幸運を招く。',
    '丁寧に積み重ねたtxが、吉の道を照らす。',
  ],
  中吉: [
    '平穏なる運気。されど、一歩を踏み出せば光明が見えよう。',
    '静かな波の中に、好機の芽が育つ。',
  ],
  小吉: [
    '小さな縁が、大きな縁へと繋がっていく。',
    '萌芽の時。焦らず、丁寧に根を張ること。',
  ],
  末吉: [
    '今は種まきの時。やがて大きな花が咲くであろう。',
    '末広がりの運気。これより上昇の兆しあり。',
  ],
  凶: [
    '嵐の前の静けさ。されど、転機は必ず訪れる。',
    '今こそ内なる力を蓄えよ。次の波は必ず来たる。',
  ],
};

const BODIES: Record<FortuneGrade, string[]> = {
  大吉: [
    'あなたのオンチェーン活動は非常に活発です。多くのコントラクトと積極的に関わり、Baseの生態系に深く根ざしています。この勢いを保ち続けることで、さらなる発展が期待できます。',
    'ウォレットに宿る活気が、強運を呼び込んでいます。継続的な活動と豊富な経験が、あなたを大吉へと導きました。',
  ],
  吉: [
    'バランスの取れたオンチェーン活動が、安定した運気をもたらしています。着実な積み重ねが、確かな幸運の礎となっています。',
    '程よい活動量と実績が、吉の運気を引き寄せています。このペースを維持することが、さらなる発展に繋がるでしょう。',
  ],
  中吉: [
    'まずまずのオンチェーン活動が見られます。さらに多様なコントラクトと関わることで、運気はより上昇するでしょう。',
    '中程度の活動量が中吉を示しています。新しい挑戦を恐れず、積極的に動くことが吉と出るでしょう。',
  ],
  小吉: [
    'オンチェーンの歩みは緩やかですが、着実に前進しています。焦らず、自分のペースで活動を続けることが大切です。',
    'まだまだ成長の余地があります。新しいプロトコルや機能を試すことで、運気は上向いていくでしょう。',
  ],
  末吉: [
    '活動が少なめですが、これからが本番です。末広がりの縁起を信じ、一歩ずつ前進することで運気は開けます。',
    'ウォレットの眠りを覚ます時が来たようです。小さな一歩から始めることで、運命は動き出します。',
  ],
  凶: [
    'オンチェーン活動がほとんど見当たりません。しかし、全ての始まりは「凶」からとも言います。今こそ新しい一歩を踏み出す絶好の機会です。',
    '現時点では難しい運気ですが、悲観することはありません。オンチェーンの世界に足を踏み入れることで、運命は大きく変わります。',
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
      label: '総取引数',
      value: stats.txCount === 0 ? 'なし' : `${stats.txCount} tx`,
      icon: '⛩',
      good: stats.txCount > 10,
    },
    {
      label: 'ウォレット歴',
      value: stats.walletAgeDays === 0 ? '新規' : `${stats.walletAgeDays} 日`,
      icon: '🏮',
      good: stats.walletAgeDays > 30,
    },
    {
      label: '最終取引',
      value: stats.daysSinceLastTx >= 999
        ? 'なし'
        : stats.daysSinceLastTx === 0
        ? '本日'
        : `${stats.daysSinceLastTx} 日前`,
      icon: '🌊',
      good: stats.daysSinceLastTx <= 7,
    },
    {
      label: '使用コントラクト',
      value: `${stats.uniqueContracts} 種`,
      icon: '🎋',
      good: stats.uniqueContracts >= 5,
    },
    {
      label: 'ETH残高',
      value: formatBalance(stats.ethBalance),
      icon: '⛩',
      good: stats.ethBalance > 10000000000000000n,
    },
    {
      label: '成功率',
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

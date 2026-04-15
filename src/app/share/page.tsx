import { type Metadata } from 'next';

const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL || 'https://omikuji.vercel.app'
).replace(/\/$/, '');

interface Props {
  searchParams: { grade?: string; gradeEn?: string; headline?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const grade    = searchParams.grade    || '吉';
  const gradeEn  = searchParams.gradeEn  || 'GOOD LUCK';
  const headline = searchParams.headline || '';

  const ogImage = `${APP_URL}/og-result?grade=${encodeURIComponent(grade)}&gradeEn=${encodeURIComponent(gradeEn)}&headline=${encodeURIComponent(headline)}&v=4`;

  const title       = `${grade} (${gradeEn}) — Onchain Omikuji`;
  const description = headline || `My Base chain fortune is ${grade}! Draw yours on Onchain Omikuji.`;

  const miniAppEmbed = {
    version: 'next',
    imageUrl: ogImage,
    button: {
      title: 'Draw My Fortune',
      action: {
        type: 'launch_frame',
        name: 'Onchain Omikuji',
        url: APP_URL,
        iconUrl: `${APP_URL}/icon.png`,
        splashImageUrl: `${APP_URL}/splash.png`,
        splashBackgroundColor: '#F5EDD8',
      },
    },
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    other: {
      'fc:miniapp': JSON.stringify(miniAppEmbed),
    },
  };
}

export default function SharePage({ searchParams }: Props) {
  const grade   = searchParams.grade   || '吉';
  const gradeEn = searchParams.gradeEn || 'GOOD LUCK';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#F5EDD8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
        gap: 16,
      }}
    >
      <p style={{ fontSize: 14, letterSpacing: '0.3em', color: 'rgba(26,20,52,0.4)' }}>
        ONCHAIN OMIKUJI
      </p>
      <p style={{ fontSize: 72, fontWeight: 700, color: '#C8102E', margin: 0 }}>{grade}</p>
      <p style={{ fontSize: 18, color: 'rgba(26,20,52,0.5)', letterSpacing: '0.15em' }}>{gradeEn}</p>
      <a
        href={APP_URL}
        style={{
          marginTop: 24,
          padding: '14px 40px',
          background: '#C8102E',
          color: '#F5EDD8',
          borderRadius: 6,
          fontWeight: 700,
          fontSize: 18,
          textDecoration: 'none',
        }}
      >
        Draw Your Fortune
      </a>
    </main>
  );
}

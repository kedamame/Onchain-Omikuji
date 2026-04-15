import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://omikuji.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: '今日の運勢を占う',
    action: {
      type: 'launch_miniapp',
      name: 'オンチェーン御籤',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#F5EDD8',
    },
  },
};

export const metadata: Metadata = {
  title: 'オンチェーン御籤',
  description: 'Baseチェーンの軌跡が、運命を語る。あなたのウォレット活動で今日の運勢を占います。',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'オンチェーン御籤',
    description: 'Baseチェーンの軌跡が、運命を語る',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
    'base:app_id': process.env.NEXT_PUBLIC_BASE_APP_ID || '',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

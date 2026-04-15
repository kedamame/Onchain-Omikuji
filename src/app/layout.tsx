import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://omikuji.vercel.app').replace(/\/$/, '');

const miniAppEmbed = {
  version: 'next',
  imageUrl: `${APP_URL}/opengraph-image`,
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

export const metadata: Metadata = {
  title: 'Onchain Omikuji',
  description: 'Your onchain history on Base reveals your fate. Draw your fortune now.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Onchain Omikuji',
    description: 'Your onchain history on Base reveals your fate',
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
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

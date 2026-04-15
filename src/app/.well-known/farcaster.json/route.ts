import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL || 'https://omikuji.vercel.app';

  const manifest = {
    // accountAssociation is required for production store listing.
    // Generate it via: https://warpcast.com/~/developers/frames
    // and set FARCASTER_HEADER / FARCASTER_PAYLOAD / FARCASTER_SIGNATURE env vars.
    ...(process.env.FARCASTER_HEADER &&
      process.env.FARCASTER_PAYLOAD &&
      process.env.FARCASTER_SIGNATURE && {
        accountAssociation: {
          header: process.env.FARCASTER_HEADER,
          payload: process.env.FARCASTER_PAYLOAD,
          signature: process.env.FARCASTER_SIGNATURE,
        },
      }),
    frame: {
      version: '1',
      name: 'Onchain Omikuji',
      iconUrl: `${APP_URL}/icon.png`,
      homeUrl: APP_URL,
      imageUrl: `${APP_URL}/opengraph-image`,
      buttonTitle: 'Draw My Fortune',
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#F5EDD8',
    },
  };

  return NextResponse.json(manifest);
}

'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import { OmikujiCard } from '@/components/OmikujiCard';
import { ConnectWallet } from '@/components/ConnectWallet';

export default function Home() {
  const { isInMiniApp, isLoading } = useFarcasterMiniApp();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-crimson border-t-transparent animate-spin" />
          <p className="font-mincho text-ink/40 text-sm">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background decorations */}
      <BackgroundDecorations />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 pt-8 pb-20">

        {/* Header */}
        <header className="w-full max-w-xs mb-8 text-center">
          {/* Top ornament */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex-1 max-w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <SealCircle char="運" size="sm" />
            <div className="flex-1 max-w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <h1 className="font-mincho font-bold text-ink leading-tight">
            <span className="text-3xl tracking-widest">御籤</span>
            <span className="block text-xs tracking-[0.3em] text-ink/50 mt-0.5 font-gothic">
              ONCHAIN OMIKUJI
            </span>
          </h1>

          <p className="font-mincho text-ink/50 text-xs mt-2 tracking-wide">
            Your onchain history reveals your fate
          </p>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex-1 max-w-16 h-px bg-gradient-to-r from-transparent to-ink/15" />
            <div className="flex gap-1">
              {['◆', '◇', '◆'].map((s, i) => (
                <span key={i} className="text-ink/20 text-xs">{s}</span>
              ))}
            </div>
            <div className="flex-1 max-w-16 h-px bg-gradient-to-l from-transparent to-ink/15" />
          </div>
        </header>

        {/* Main content */}
        <div className="w-full max-w-xs flex-1 flex flex-col items-center justify-start">
          {!isConnected ? (
            <ConnectWallet isInMiniApp={isInMiniApp} />
          ) : (
            <OmikujiCard
              address={address!}
              isInMiniApp={isInMiniApp}
              onDisconnect={() => disconnect()}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center space-y-1">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-ink/10" />
            <span className="font-gothic text-ink/20 text-xs">Built on Base</span>
            <div className="w-8 h-px bg-ink/10" />
          </div>
        </footer>
      </div>
    </main>
  );
}

/* ── Background Decorations ── */
function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Mt. Fuji silhouette - bottom right */}
      <svg
        className="absolute bottom-0 right-0 w-64 h-48 opacity-[0.04]"
        viewBox="0 0 200 150"
        fill="#1A1434"
      >
        <path d="M100 10 L150 80 L180 80 L200 120 L200 150 L0 150 L0 120 L20 80 L50 80 Z" />
        <path d="M85 40 L100 10 L115 40 Z" fill="white" />
      </svg>

      {/* Wave pattern - top */}
      <svg
        className="absolute top-0 left-0 w-full h-20 opacity-[0.06]"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 C30 20, 60 60, 90 40 S150 20, 180 40 S240 60, 270 40 S330 20, 360 40 S400 60, 420 40 L420 0 L0 0 Z"
          fill="#1A1434"
        />
      </svg>

      {/* Wave pattern - bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 opacity-[0.06]"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 C30 40, 60 0, 90 20 S150 40, 180 20 S240 0, 270 20 S330 40, 360 20 S400 0, 420 20 L420 60 L0 60 Z"
          fill="#1A1434"
        />
      </svg>

      {/* Crane - top left */}
      <svg
        className="absolute top-16 left-4 w-14 h-14 opacity-[0.07] animate-float"
        style={{ animationDelay: '1s' }}
        viewBox="0 0 100 100"
        fill="#1A1434"
      >
        {/* Simple origami crane */}
        <polygon points="50,10 80,60 50,45 20,60" />
        <polygon points="50,45 30,70 50,65 70,70" />
        <polygon points="50,65 45,90 50,75 55,90" />
        <polygon points="10,50 30,40 25,55" />
        <polygon points="90,50 70,40 75,55" />
      </svg>

      {/* Plum blossom - right */}
      <svg
        className="absolute top-32 right-3 w-12 h-12 opacity-[0.07]"
        viewBox="0 0 100 100"
      >
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse
            key={i}
            cx={50 + 22 * Math.cos((deg * Math.PI) / 180)}
            cy={50 + 22 * Math.sin((deg * Math.PI) / 180)}
            rx="15"
            ry="15"
            fill="#C8102E"
            opacity="0.5"
          />
        ))}
        <circle cx="50" cy="50" r="10" fill="#D4A017" opacity="0.7" />
      </svg>

      {/* Corner seal - top right */}
      <div className="absolute top-4 right-4 opacity-10">
        <SealCircle char="縁" size="lg" />
      </div>

      {/* Corner seal - bottom left */}
      <div className="absolute bottom-16 left-4 opacity-8">
        <SealCircle char="福" size="md" />
      </div>
    </div>
  );
}

/* ── Seal Circle Component ── */
function SealCircle({ char, size }: { char: string; size: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
  return (
    <div
      className={`${sizes[size]} rounded-full border-2 border-crimson flex items-center justify-center`}
    >
      <span className="font-mincho font-bold text-crimson">{char}</span>
    </div>
  );
}

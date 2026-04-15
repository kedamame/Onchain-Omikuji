'use client';

import { useState, useEffect } from 'react';
import { fetchWalletStats } from '@/lib/blockscout';
import { calculateFortune, type FortuneResult } from '@/lib/fortune';
import { shareToFarcaster } from '@/lib/farcaster';

interface Props {
  address: string;
  isInMiniApp: boolean;
  onDisconnect: () => void;
}

type Phase = 'idle' | 'analyzing' | 'revealing' | 'done';

export function OmikujiCard({ address, isInMiniApp, onDisconnect }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://omikuji.vercel.app';

  const runFortune = async () => {
    setPhase('analyzing');
    setError(null);
    try {
      const stats = await fetchWalletStats(address);
      const result = calculateFortune(stats, address);
      setFortune(result);
      setPhase('revealing');
      setTimeout(() => setPhase('done'), 1400);
    } catch {
      setError('Failed to fetch data. Please try again.');
      setPhase('idle');
    }
  };

  const handleShare = () => {
    if (!fortune) return;
    const shareUrl =
      `${appUrl}/share` +
      `?grade=${encodeURIComponent(fortune.grade)}` +
      `&gradeEn=${encodeURIComponent(fortune.gradeEn)}` +
      `&headline=${encodeURIComponent(fortune.headline)}`;
    const text = `My onchain fortune is "${fortune.grade}" (${fortune.gradeEn})!\n${fortune.headline}\n\n#OnchainOmikuji #Base`;
    shareToFarcaster(text, shareUrl, isInMiniApp);
  };

  const handleReset = () => {
    setFortune(null);
    setPhase('idle');
  };

  if (phase === 'analyzing') {
    return <AnalyzingScreen />;
  }

  if ((phase === 'revealing' || phase === 'done') && fortune) {
    return (
      <FortuneReveal
        fortune={fortune}
        phase={phase}
        onShare={handleShare}
        onReset={handleReset}
        onDisconnect={onDisconnect}
        address={address}
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      {/* Address display */}
      <div className="w-full bg-paper-dark/60 border border-ink/10 rounded-sm px-4 py-2 text-center">
        <p className="font-gothic text-ink/40 text-xs mb-0.5">Connected</p>
        <p className="font-gothic text-ink/70 text-sm font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
      </div>

      {error && (
        <p className="font-gothic text-crimson text-sm text-center">{error}</p>
      )}

      {/* Draw button */}
      <div className="flex flex-col items-center gap-4 w-full">
        <p className="font-mincho text-ink/60 text-sm text-center">
          Ready? Draw your omikuji.
        </p>
        <p className="font-gothic text-ink/35 text-xs text-center">
          Your fortune is drawn once per day.<br />
          It renews at midnight (JST).
        </p>
        <button
          onClick={runFortune}
          className="
            relative w-full py-5 px-8
            bg-crimson hover:bg-crimson-dark
            text-scroll font-mincho font-bold text-xl
            rounded-sm transition-all duration-200
            shadow-xl shadow-crimson/40
            border-2 border-crimson-dark/30
            active:scale-95
          "
        >
          Draw Omikuji
          <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-scroll/60" />
          <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-scroll/60" />
          <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-scroll/60" />
          <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-scroll/60" />
        </button>
      </div>

      <button
        onClick={onDisconnect}
        className="font-gothic text-ink/30 text-xs hover:text-ink/50 transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
}

/* ── Analyzing Screen ── */
function AnalyzingScreen() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? '' : d + '.')), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xs">
      {/* Spinning coin/seal */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-crimson/20 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border-2 border-gold/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '4s' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-crimson/10 border-2 border-crimson flex items-center justify-center">
            <span className="font-mincho text-crimson text-2xl font-bold">占</span>
          </div>
        </div>
        {/* Orbiting dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/60"
            style={{
              top: `${50 - 45 * Math.cos((deg * Math.PI) / 180)}%`,
              left: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-2">
        <p className="font-mincho text-ink text-lg">
          Reading your fortune{dots}
        </p>
        <p className="font-gothic text-ink/40 text-xs">
          Reading your last 100 transactions on Base
        </p>
      </div>

      {/* Decorative wave */}
      <WaveDecoration />
    </div>
  );
}

/* ── Fortune Reveal ── */
interface RevealProps {
  fortune: FortuneResult;
  phase: Phase;
  onShare: () => void;
  onReset: () => void;
  onDisconnect: () => void;
  address: string;
}

function FortuneReveal({ fortune, phase, onShare, onReset, onDisconnect, address }: RevealProps) {
  const isDone = phase === 'done';

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs">

      {/* Scroll */}
      <div
        className="w-full rounded-sm overflow-hidden shadow-xl"
        style={{
          animation: 'unfurl 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          background: '#FEFAF2',
          border: '2px solid rgba(26,20,52,0.12)',
        }}
      >
        {/* Scroll top rod */}
        <div className="h-4 bg-gradient-to-r from-[#8B6914] via-[#D4A017] to-[#8B6914] shadow-md" />

        {/* Scroll content */}
        <div className="px-5 py-6 space-y-4">
          {/* Header */}
          <div className="text-center space-y-1">
            <p className="font-mincho text-ink/50 text-xs tracking-widest">
              ─── Your Fortune ───
            </p>
            <p className="font-gothic text-ink/30 text-xs font-mono">
              {address.slice(0, 6)}...{address.slice(-4)}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-ink/10" />
            <span className="text-gold text-xs">⬡</span>
            <div className="flex-1 h-px bg-ink/10" />
          </div>

          {/* Grade stamp */}
          <div className="flex justify-center">
            <div
              className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center border-4 shadow-lg"
              style={{
                borderColor: fortune.color,
                background: fortune.bgColor,
                animation: isDone ? 'stamp 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards' : 'none',
                boxShadow: `0 0 24px ${fortune.color}40`,
              }}
            >
              {/* Outer ring */}
              <div
                className="absolute inset-1 rounded-full border-2 border-dashed opacity-30"
                style={{ borderColor: fortune.color }}
              />
              <span
                className="font-mincho font-bold text-4xl leading-none"
                style={{ color: fortune.color }}
              >
                {fortune.grade}
              </span>
              <span
                className="font-gothic text-xs tracking-widest mt-0.5 opacity-70"
                style={{ color: fortune.color }}
              >
                {fortune.gradeEn}
              </span>
            </div>
          </div>

          {/* Headline */}
          {isDone && (
            <div
              className="text-center"
              style={{ animation: 'fadeIn 0.8s ease 0.2s forwards', opacity: 0 }}
            >
              <p className="font-mincho text-ink text-sm leading-relaxed">
                {fortune.headline}
              </p>
            </div>
          )}

          {/* Details grid */}
          {isDone && (
            <div
              className="grid grid-cols-2 gap-2"
              style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s forwards', opacity: 0, transform: 'translateY(24px)' }}
            >
              {fortune.details.map((d, i) => (
                <div
                  key={i}
                  className="bg-paper-dark/40 border border-ink/8 rounded-sm px-3 py-2 text-center"
                >
                  <p className="font-gothic text-ink/40 text-xs mb-0.5">{d.label}</p>
                  <p
                    className="font-gothic text-sm font-bold"
                    style={{
                      color: d.good === null ? '#1A1434' : d.good ? '#2D6A4F' : '#C8102E',
                    }}
                  >
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Body text */}
          {isDone && (
            <div
              className="border-t border-ink/10 pt-3"
              style={{ animation: 'fadeIn 0.8s ease 0.6s forwards', opacity: 0 }}
            >
              <p className="font-mincho text-ink/70 text-xs leading-relaxed text-center">
                {fortune.body}
              </p>
            </div>
          )}
        </div>

        {/* Scroll bottom rod */}
        <div className="h-4 bg-gradient-to-r from-[#8B6914] via-[#D4A017] to-[#8B6914] shadow-md" />
      </div>

      {/* Action buttons */}
      {isDone && (
        <div
          className="flex flex-col gap-3 w-full"
          style={{ animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s forwards', opacity: 0, transform: 'translateY(24px)' }}
        >
          <button
            onClick={onShare}
            className="
              relative w-full py-3 px-6
              bg-crimson hover:bg-crimson-dark
              text-scroll font-mincho font-bold
              rounded-sm transition-all duration-200
              shadow-lg shadow-crimson/30 active:scale-95
              border border-crimson-dark/30
            "
          >
            Share on Farcaster
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-scroll/60" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-scroll/60" />
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-scroll/60" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-scroll/60" />
          </button>
          <button
            onClick={onReset}
            className="
              w-full py-2.5 px-6
              bg-paper-dark/60 hover:bg-paper-dark
              text-ink/70 font-mincho
              rounded-sm transition-all duration-200 border border-ink/10
            "
          >
            Draw Again
          </button>
          <p className="font-gothic text-ink/25 text-xs text-center pt-1">
            Fortune renews daily at midnight (JST)
          </p>
          <button
            onClick={onDisconnect}
            className="font-gothic text-ink/30 text-xs hover:text-ink/50 transition-colors text-center"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Wave Decoration ── */
function WaveDecoration() {
  return (
    <svg viewBox="0 0 200 30" className="w-48 h-6 opacity-20" fill="none">
      <path
        d="M0 15 C20 5, 40 25, 60 15 S100 5, 120 15 S160 25, 180 15 S200 5, 220 15"
        stroke="#1A1434"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

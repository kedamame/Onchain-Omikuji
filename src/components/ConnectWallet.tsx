'use client';

import { useConnect } from 'wagmi';

interface Props {
  isInMiniApp: boolean;
}

export function ConnectWallet({ isInMiniApp }: Props) {
  const { connect, connectors, isPending } = useConnect();

  const handleConnect = () => {
    if (isInMiniApp) {
      const fc = connectors.find((c) => c.id === 'farcasterMiniApp');
      if (fc) { connect({ connector: fc }); return; }
    }
    const cb = connectors.find((c) => c.id === 'coinbaseWalletSDK');
    const inj = connectors.find((c) => c.id === 'injected');
    connect({ connector: cb ?? inj ?? connectors[0] });
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-xs">
      {/* Decorative lanterns */}
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

      <button
        onClick={handleConnect}
        disabled={isPending}
        className="
          relative w-full py-4 px-8
          bg-crimson hover:bg-crimson-dark
          text-scroll font-mincho font-bold text-lg
          rounded-sm
          transition-all duration-200
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
          'Draw Your Omikuji'
        )}
        {/* Corner ornaments */}
        <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-scroll/60" />
        <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-scroll/60" />
        <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-scroll/60" />
        <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-scroll/60" />
      </button>

      <p className="font-gothic text-ink/30 text-xs text-center">
        Signature only. No transaction required.
      </p>
    </div>
  );
}

function Lantern({ delay }: { delay: string }) {
  return (
    <div
      className="animate-float flex flex-col items-center"
      style={{ animationDelay: delay }}
    >
      {/* String */}
      <div className="w-px h-3 bg-ink/30" />
      {/* Lantern body */}
      <div className="relative w-7 h-10 bg-crimson rounded-full border-2 border-crimson-dark/40 shadow-md shadow-crimson/40 flex items-center justify-center">
        <div className="w-px h-6 bg-scroll/30 absolute" />
        <div className="h-px w-4 bg-scroll/30 absolute top-2" />
        <div className="h-px w-4 bg-scroll/30 absolute bottom-2" />
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-gold/20 blur-sm" />
      </div>
      {/* Tassel */}
      <div className="w-px h-3 bg-gold/60" />
      <div className="flex gap-0.5">
        <div className="w-px h-2 bg-gold/60" />
        <div className="w-px h-3 bg-gold/60" />
        <div className="w-px h-2 bg-gold/60" />
      </div>
    </div>
  );
}

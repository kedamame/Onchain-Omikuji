import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const W = 1284;
const H = 2778;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: '#F5EDD8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontFamily: 'serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top crimson bar */}
        <div style={{ width: W, height: 12, background: '#C8102E', display: 'flex' }} />

        {/* Status bar */}
        <div
          style={{
            width: W,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 60,
            paddingRight: 60,
            background: '#F5EDD8',
          }}
        >
          <div style={{ fontSize: 36, color: '#1A1434', fontWeight: 700, display: 'flex' }}>9:41</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 48, height: 24, borderRadius: 6, border: '3px solid #1A1434', display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
              <div style={{ width: 28, height: 14, background: '#1A1434', borderRadius: 3, display: 'flex' }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, paddingBottom: 32 }}>
          <div style={{ fontSize: 32, color: 'rgba(26,20,52,0.4)', letterSpacing: '0.3em', display: 'flex' }}>ONCHAIN OMIKUJI</div>
          <div style={{ fontSize: 80, fontWeight: 700, color: '#1A1434', letterSpacing: '0.1em', lineHeight: 1.1, display: 'flex' }}>御籤</div>
          <div style={{ width: 240, height: 4, background: '#D4A017', opacity: 0.7, marginTop: 10, display: 'flex' }} />
        </div>

        {/* Your Fortune label */}
        <div style={{ fontSize: 38, color: 'rgba(26,20,52,0.5)', letterSpacing: '0.2em', marginBottom: 32, display: 'flex' }}>
          YOUR FORTUNE
        </div>

        {/* Scroll / fortune card */}
        <div
          style={{
            width: 980,
            background: '#FEFAF2',
            border: '3px solid rgba(200,16,46,0.2)',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 60,
            paddingBottom: 60,
            paddingLeft: 60,
            paddingRight: 60,
            position: 'relative',
          }}
        >
          {/* Top scroll rod */}
          <div style={{ position: 'absolute', top: -16, left: 40, right: 40, height: 32, background: '#D4A017', borderRadius: 16, opacity: 0.8, display: 'flex' }} />
          {/* Bottom scroll rod */}
          <div style={{ position: 'absolute', bottom: -16, left: 40, right: 40, height: 32, background: '#D4A017', borderRadius: 16, opacity: 0.8, display: 'flex' }} />

          {/* Grade stamp */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 40 }}>
            <div
              style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                border: '10px solid #C8102E',
                background: '#FEFAF2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: 140, color: '#C8102E', fontWeight: 700, lineHeight: 1, display: 'flex' }}>大</div>
            </div>
            <div style={{ fontSize: 100, fontWeight: 700, color: '#C8102E', letterSpacing: '0.15em', marginTop: 8, display: 'flex' }}>大吉</div>
            <div style={{ fontSize: 40, color: 'rgba(200,16,46,0.7)', letterSpacing: '0.2em', display: 'flex' }}>GREAT LUCK</div>
          </div>

          {/* Gold divider */}
          <div style={{ width: 600, height: 3, background: '#D4A017', opacity: 0.6, marginBottom: 40, display: 'flex' }} />

          {/* Fortune message */}
          <div style={{ fontSize: 38, color: '#1A1434', textAlign: 'center', lineHeight: 1.6, marginBottom: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex' }}>The chain flows strongly through you.</div>
            <div style={{ display: 'flex' }}>Your onchain journey marks you as</div>
            <div style={{ display: 'flex' }}>a true builder of the new world.</div>
          </div>

          {/* Stats grid — 5 items (no Total Txs) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.05em', display: 'flex' }}>WALLET AGE</div>
                <div style={{ fontSize: 48, color: '#1A1434', fontWeight: 700, display: 'flex' }}>612d</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.05em', display: 'flex' }}>LAST TX</div>
                <div style={{ fontSize: 48, color: '#1A1434', fontWeight: 700, display: 'flex' }}>Today</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.05em', display: 'flex' }}>CONTRACTS</div>
                <div style={{ fontSize: 48, color: '#1A1434', fontWeight: 700, display: 'flex' }}>94</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.05em', display: 'flex' }}>ETH BALANCE</div>
                <div style={{ fontSize: 48, color: '#1A1434', fontWeight: 700, display: 'flex' }}>2.41 ETH</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.05em', display: 'flex' }}>SUCCESS RATE</div>
                <div style={{ fontSize: 48, color: '#1A1434', fontWeight: 700, display: 'flex' }}>98.2%</div>
              </div>
              <div style={{ flex: 1, background: 'rgba(200,16,46,0.05)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 26, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.03em', display: 'flex' }}>LAST 100 TXS</div>
                <div style={{ fontSize: 36, color: '#2D6A4F', fontWeight: 700, display: 'flex' }}>Analyzed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 900, marginTop: 80 }}>
          {/* Share button */}
          <div
            style={{
              width: '100%',
              paddingTop: 44,
              paddingBottom: 44,
              background: '#C8102E',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid rgba(139,0,20,0.3)',
            }}
          >
            <div style={{ fontSize: 48, color: '#F5EDD8', fontWeight: 700, display: 'flex' }}>Share on Farcaster</div>
          </div>
          {/* Draw Again */}
          <div
            style={{
              width: '100%',
              paddingTop: 40,
              paddingBottom: 40,
              background: 'transparent',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid rgba(26,20,52,0.2)',
            }}
          >
            <div style={{ fontSize: 44, color: '#1A1434', display: 'flex' }}>Draw Again</div>
          </div>
        </div>

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 100, left: 40, width: 60, height: 60, borderTop: '4px solid rgba(200,16,46,0.2)', borderLeft: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 100, right: 40, width: 60, height: 60, borderTop: '4px solid rgba(200,16,46,0.2)', borderRight: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 60, height: 60, borderBottom: '4px solid rgba(200,16,46,0.2)', borderLeft: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 60, height: 60, borderBottom: '4px solid rgba(200,16,46,0.2)', borderRight: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />

        {/* Bottom crimson bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: W, height: 12, background: '#C8102E', display: 'flex' }} />
      </div>
    ),
    { width: W, height: H }
  );
}

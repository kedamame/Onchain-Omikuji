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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, paddingBottom: 40 }}>
          <div style={{ fontSize: 34, color: 'rgba(26,20,52,0.4)', letterSpacing: '0.3em', display: 'flex' }}>ONCHAIN OMIKUJI</div>
          <div style={{ fontSize: 100, fontWeight: 700, color: '#1A1434', letterSpacing: '0.1em', lineHeight: 1.1, display: 'flex' }}>御籤</div>
          <div style={{ width: 280, height: 4, background: '#D4A017', opacity: 0.7, marginTop: 12, display: 'flex' }} />
        </div>

        {/* Connected badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(212,160,23,0.15)', border: '2px solid rgba(212,160,23,0.4)', borderRadius: 40, paddingTop: 16, paddingBottom: 16, paddingLeft: 36, paddingRight: 36, marginBottom: 100 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#4CAF50', display: 'flex' }} />
          <div style={{ fontSize: 34, color: '#1A1434', display: 'flex' }}>Connected: 0x1a2b...3c4d</div>
        </div>

        {/* Spinning seal — rendered as static concentric circles */}
        <div style={{ position: 'relative', width: 500, height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 80 }}>
          {/* Outer ring */}
          <div style={{ position: 'absolute', width: 480, height: 480, borderRadius: '50%', border: '3px dashed rgba(200,16,46,0.2)', display: 'flex' }} />
          {/* Middle ring */}
          <div style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', border: '6px solid rgba(200,16,46,0.15)', display: 'flex' }} />
          {/* Main seal */}
          <div style={{ width: 280, height: 280, borderRadius: '50%', border: '12px solid #C8102E', background: '#FEFAF2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 160, color: '#C8102E', fontWeight: 700, lineHeight: 1, display: 'flex' }}>籤</div>
          </div>
          {/* Orbiting dots */}
          <div style={{ position: 'absolute', top: 10, left: 230, width: 24, height: 24, borderRadius: '50%', background: '#D4A017', opacity: 0.8, display: 'flex' }} />
          <div style={{ position: 'absolute', bottom: 10, right: 230, width: 20, height: 20, borderRadius: '50%', background: '#C8102E', opacity: 0.6, display: 'flex' }} />
          <div style={{ position: 'absolute', top: 230, right: 10, width: 16, height: 16, borderRadius: '50%', background: '#D4A017', opacity: 0.5, display: 'flex' }} />
        </div>

        {/* Analyzing text */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, marginBottom: 120 }}>
          <div style={{ fontSize: 60, color: '#1A1434', fontWeight: 700, display: 'flex' }}>Reading the chain...</div>
          <div style={{ fontSize: 40, color: 'rgba(26,20,52,0.5)', display: 'flex' }}>Analyzing your onchain history</div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#C8102E', display: 'flex' }} />
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#C8102E', opacity: 0.5, display: 'flex' }} />
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#C8102E', opacity: 0.2, display: 'flex' }} />
          </div>
        </div>

        {/* Stats being analyzed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 900 }}>
          <div style={{ fontSize: 34, color: 'rgba(26,20,52,0.4)', letterSpacing: '0.1em', display: 'flex' }}>GATHERING YOUR FATE...</div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, background: 'rgba(200,16,46,0.06)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 32, paddingBottom: 32, paddingLeft: 32, paddingRight: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32, color: 'rgba(26,20,52,0.4)', display: 'flex' }}>Total Txs</div>
              <div style={{ width: 120, height: 16, background: 'rgba(26,20,52,0.1)', borderRadius: 8, display: 'flex' }} />
            </div>
            <div style={{ flex: 1, background: 'rgba(200,16,46,0.06)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 32, paddingBottom: 32, paddingLeft: 32, paddingRight: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32, color: 'rgba(26,20,52,0.4)', display: 'flex' }}>Wallet Age</div>
              <div style={{ width: 100, height: 16, background: 'rgba(26,20,52,0.1)', borderRadius: 8, display: 'flex' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1, background: 'rgba(200,16,46,0.06)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 32, paddingBottom: 32, paddingLeft: 32, paddingRight: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32, color: 'rgba(26,20,52,0.4)', display: 'flex' }}>ETH Balance</div>
              <div style={{ width: 80, height: 16, background: 'rgba(26,20,52,0.1)', borderRadius: 8, display: 'flex' }} />
            </div>
            <div style={{ flex: 1, background: 'rgba(200,16,46,0.06)', border: '2px solid rgba(200,16,46,0.15)', borderRadius: 16, paddingTop: 32, paddingBottom: 32, paddingLeft: 32, paddingRight: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 32, color: 'rgba(26,20,52,0.4)', display: 'flex' }}>Contracts</div>
              <div style={{ width: 90, height: 16, background: 'rgba(26,20,52,0.1)', borderRadius: 8, display: 'flex' }} />
            </div>
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

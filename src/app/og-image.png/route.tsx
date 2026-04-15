import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const maxDuration = 15;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#F5EDD8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Top border */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#C8102E' }} />
        {/* Bottom border */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 8, background: '#C8102E' }} />

        {/* Wave bg top */}
        <div
          style={{
            position: 'absolute', top: 8, left: 0, right: 0, height: 70,
            background: 'rgba(26,20,52,0.05)',
          }}
        />
        {/* Wave bg bottom */}
        <div
          style={{
            position: 'absolute', bottom: 8, left: 0, right: 0, height: 70,
            background: 'rgba(26,20,52,0.05)',
          }}
        />

        {/* Corner seals */}
        {/* Corner seals */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(200,16,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
          <div style={{ fontSize: 36, color: '#C8102E', fontWeight: 700 }}>縁</div>
        </div>
        <div style={{ position: 'absolute', top: 40, right: 40, width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(200,16,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
          <div style={{ fontSize: 36, color: '#C8102E', fontWeight: 700 }}>運</div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(200,16,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
          <div style={{ fontSize: 36, color: '#C8102E', fontWeight: 700 }}>福</div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 80, height: 80, borderRadius: '50%', border: '3px solid rgba(200,16,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.35 }}>
          <div style={{ fontSize: 36, color: '#C8102E', fontWeight: 700 }}>吉</div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          {/* Big seal */}
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              border: '10px solid #C8102E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FEFAF2',

              flexShrink: 0,
            }}
          >
            <div style={{ fontSize: 120, color: '#C8102E', fontWeight: 700, lineHeight: 1 }}>籤</div>
          </div>

          {/* Text block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 22, color: 'rgba(26,20,52,0.45)', letterSpacing: '0.3em' }}>
              ONCHAIN OMIKUJI
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 700,
                color: '#1A1434',
                letterSpacing: '0.15em',
                lineHeight: 1.1,
              }}
            >
              御籤
            </div>
            <div style={{ width: 240, height: 3, background: '#D4A017', margin: '16px 0', opacity: 0.7 }} />
            <div style={{ fontSize: 26, color: 'rgba(26,20,52,0.6)', lineHeight: 1.5 }}>
              Your onchain history
            </div>
            <div style={{ fontSize: 26, color: 'rgba(26,20,52,0.6)' }}>
              reveals your fate
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

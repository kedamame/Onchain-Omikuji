import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 15;

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 900,
          height: 600,
          background: '#F5EDD8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'serif',
        }}
      >
        {/* Wave top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'rgba(26,20,52,0.06)',
            borderRadius: '0 0 50% 50%',
          }}
        />
        {/* Wave bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: 'rgba(26,20,52,0.06)',
            borderRadius: '50% 50% 0 0',
          }}
        />

        {/* Left seal */}
        <div
          style={{
            position: 'absolute',
            left: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '4px solid #C8102E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FEFAF2',
            opacity: 0.4,
          }}
        >
          <div style={{ fontSize: 54, color: '#C8102E', fontWeight: 700 }}>縁</div>
        </div>

        {/* Right seal */}
        <div
          style={{
            position: 'absolute',
            right: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '4px solid #C8102E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FEFAF2',
            opacity: 0.4,
          }}
        >
          <div style={{ fontSize: 54, color: '#C8102E', fontWeight: 700 }}>福</div>
        </div>

        {/* Center content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          {/* Main seal */}
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              border: '8px solid #C8102E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FEFAF2',
              marginBottom: 24,
              boxShadow: '0 8px 40px rgba(200,16,46,0.25)',
            }}
          >
            <div style={{ fontSize: 100, color: '#C8102E', fontWeight: 700, lineHeight: 1 }}>
              籤
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#1A1434',
              letterSpacing: '0.2em',
              lineHeight: 1,
            }}
          >
            御籤
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'rgba(26,20,52,0.4)',
              letterSpacing: '0.3em',
              marginTop: 8,
            }}
          >
            ONCHAIN OMIKUJI
          </div>
          <div
            style={{
              fontSize: 22,
              color: 'rgba(26,20,52,0.55)',
              marginTop: 20,
              letterSpacing: '0.05em',
            }}
          >
            Baseチェーンの軌跡が、運命を語る
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 200,
              height: 2,
              background: '#D4A017',
              marginTop: 24,
              opacity: 0.6,
            }}
          />

          {/* Fortune grades */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 20,
            }}
          >
            {['大吉', '吉', '中吉', '小吉', '末吉', '凶'].map((g) => (
              <div
                key={g}
                style={{
                  fontSize: 20,
                  color: g === '大吉' ? '#C8102E' : 'rgba(26,20,52,0.35)',
                  fontWeight: g === '大吉' ? 700 : 400,
                }}
              >
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 900, height: 600 }
  );
}

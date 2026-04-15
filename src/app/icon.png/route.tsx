import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1024,
          height: 1024,
          background: '#F5EDD8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background circle */}
        <div
          style={{
            position: 'absolute',
            width: 900,
            height: 900,
            borderRadius: '50%',
            background: 'rgba(200,16,46,0.08)',
          }}
        />
        {/* Main seal */}
        <div
          style={{
            width: 700,
            height: 700,
            borderRadius: '50%',
            border: '20px solid #C8102E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FEFAF2',
            position: 'relative',
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              position: 'absolute',
              width: 640,
              height: 640,
              borderRadius: '50%',
              border: '4px dashed rgba(200,16,46,0.3)',
            }}
          />
          {/* Kanji */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
            }}
          >
            <div
              style={{
                fontSize: 320,
                fontWeight: 700,
                color: '#C8102E',
                lineHeight: 1,
                fontFamily: 'serif',
              }}
            >
              籤
            </div>
          </div>
        </div>
        {/* Gold dots at cardinal points */}
        {[
          { top: 80, left: 512 },
          { top: 512, left: 80 },
          { top: 940, left: 512 },
          { top: 512, left: 940 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#D4A017',
              top: pos.top - 12,
              left: pos.left - 12,
            }}
          />
        ))}
      </div>
    ),
    { width: 1024, height: 1024 }
  );
}

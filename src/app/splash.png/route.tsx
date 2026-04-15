import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 200,
          height: 200,
          background: '#F5EDD8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            border: '6px solid #C8102E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FEFAF2',
          }}
        >
          <div style={{ fontSize: 70, color: '#C8102E', fontFamily: 'serif', fontWeight: 700 }}>
            籤
          </div>
        </div>
      </div>
    ),
    { width: 200, height: 200 }
  );
}

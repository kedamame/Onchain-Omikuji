import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const GRADE_COLORS: Record<string, string> = {
  '大吉': '#C8102E',
  '吉':   '#B8860B',
  '中吉': '#2D6A4F',
  '小吉': '#457B9D',
  '末吉': '#6B4C8A',
  '凶':   '#3D2B5E',
};

const GRADE_BG: Record<string, string> = {
  '大吉': '#FFF5F5',
  '吉':   '#FFFBF0',
  '中吉': '#F0FAF5',
  '小吉': '#F0F7FF',
  '末吉': '#F8F0FF',
  '凶':   '#F5F0FF',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const grade   = searchParams.get('grade')   || '吉';
  const gradeEn = searchParams.get('gradeEn') || 'GOOD LUCK';
  const headline = searchParams.get('headline') || '';
  const color = GRADE_COLORS[grade] ?? '#C8102E';
  const bg    = GRADE_BG[grade]    ?? '#FFF5F5';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#F5EDD8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Top/bottom borders */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: color, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: color, display: 'flex' }} />

        {/* Left wave accent */}
        <div style={{ position: 'absolute', top: 10, left: 0, bottom: 10, width: 60, background: `${color}10`, display: 'flex' }} />
        {/* Right wave accent */}
        <div style={{ position: 'absolute', top: 10, right: 0, bottom: 10, width: 60, background: `${color}10`, display: 'flex' }} />

        {/* Corner seals */}
        <div style={{ position: 'absolute', top: 36, left: 88, width: 56, height: 56, borderRadius: '50%', border: `3px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: 26, color, fontWeight: 700, display: 'flex' }}>縁</div>
        </div>
        <div style={{ position: 'absolute', top: 36, right: 88, width: 56, height: 56, borderRadius: '50%', border: `3px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: 26, color, fontWeight: 700, display: 'flex' }}>運</div>
        </div>
        <div style={{ position: 'absolute', bottom: 36, left: 88, width: 56, height: 56, borderRadius: '50%', border: `3px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: 26, color, fontWeight: 700, display: 'flex' }}>福</div>
        </div>
        <div style={{ position: 'absolute', bottom: 36, right: 88, width: 56, height: 56, borderRadius: '50%', border: `3px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
          <div style={{ fontSize: 26, color, fontWeight: 700, display: 'flex' }}>吉</div>
        </div>

        {/* Main content: seal + text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
          {/* Grade seal */}
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: '50%',
              border: `14px solid ${color}`,
              background: bg,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Inner dashed ring */}
            <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: `3px dashed ${color}40`, display: 'flex' }} />
            <div style={{ fontSize: 130, fontWeight: 700, color, lineHeight: 1, display: 'flex' }}>
              {grade}
            </div>
            <div style={{ fontSize: 22, color, letterSpacing: '0.15em', opacity: 0.8, display: 'flex' }}>
              {gradeEn}
            </div>
          </div>

          {/* Text block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 580 }}>
            {/* Branding */}
            <div style={{ fontSize: 20, color: 'rgba(26,20,52,0.4)', letterSpacing: '0.3em', display: 'flex' }}>
              ONCHAIN OMIKUJI
            </div>
            {/* 御籤 */}
            <div style={{ fontSize: 72, fontWeight: 700, color: '#1A1434', letterSpacing: '0.15em', lineHeight: 1.1, display: 'flex' }}>
              御籤
            </div>
            {/* Gold divider */}
            <div style={{ width: 220, height: 3, background: '#D4A017', opacity: 0.7, marginTop: 16, marginBottom: 24, display: 'flex' }} />
            {/* Headline */}
            {headline ? (
              <div style={{ fontSize: 28, color: 'rgba(26,20,52,0.7)', lineHeight: 1.5, display: 'flex', flexWrap: 'wrap' }}>
                {headline}
              </div>
            ) : null}
            {/* Sub label */}
            <div style={{ fontSize: 20, color: 'rgba(26,20,52,0.35)', marginTop: 20, letterSpacing: '0.05em', display: 'flex' }}>
              Draw your fortune from the Base chain
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

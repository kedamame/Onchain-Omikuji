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
  '大吉': '#FFF0F0',
  '吉':   '#FFFBF0',
  '中吉': '#F0FAF5',
  '小吉': '#F0F7FF',
  '末吉': '#F8F0FF',
  '凶':   '#F5F0FF',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const grade    = searchParams.get('grade')    || '吉';
  const gradeEn  = searchParams.get('gradeEn')  || 'GOOD LUCK';
  const headline = searchParams.get('headline') || '';
  const body     = searchParams.get('body')     || '';
  const color    = GRADE_COLORS[grade] ?? '#C8102E';
  const sealBg   = GRADE_BG[grade]    ?? '#FFF5F5';

  // Font size inside circle: 1 char = 150px, 2 chars = 100px each (stacked vertically)
  const circleFontSize = grade.length === 1 ? 150 : 100;

  // Truncate headline to ~50 chars, body to ~80 chars
  const shortHeadline = headline.length > 52 ? `${headline.slice(0, 50)}...` : headline;
  const shortBody     = body.length     > 82 ? `${body.slice(0, 80)}...`     : body;

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
        {/* Top / bottom accent bars */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, background: color, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 12, background: color, display: 'flex' }} />

        {/* Side accent panels */}
        <div style={{ position: 'absolute', top: 12, bottom: 12, left: 0, width: 56, background: `${color}12`, display: 'flex' }} />
        <div style={{ position: 'absolute', top: 12, bottom: 12, right: 0, width: 56, background: `${color}12`, display: 'flex' }} />

        {/* Corner seals */}
        <div style={{ position: 'absolute', top: 32, left: 80, width: 52, height: 52, borderRadius: '50%', border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color, fontWeight: 700, opacity: 0.45, display: 'flex' }}>縁</div>
        </div>
        <div style={{ position: 'absolute', top: 32, right: 80, width: 52, height: 52, borderRadius: '50%', border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color, fontWeight: 700, opacity: 0.45, display: 'flex' }}>運</div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 80, width: 52, height: 52, borderRadius: '50%', border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color, fontWeight: 700, opacity: 0.45, display: 'flex' }}>福</div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, right: 80, width: 52, height: 52, borderRadius: '50%', border: `2px solid ${color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, color, fontWeight: 700, opacity: 0.45, display: 'flex' }}>吉</div>
        </div>

        {/* ── Main content: left seal + right text ── */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 72 }}>

          {/* Left: grade seal block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            {/* Circle seal */}
            <div
              style={{
                width: 260,
                height: 260,
                borderRadius: '50%',
                border: `12px solid ${color}`,
                background: sealBg,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner dashed ring */}
              <div style={{
                position: 'absolute',
                top: 12, left: 12, right: 12, bottom: 12,
                borderRadius: '50%',
                border: `2px dashed ${color}35`,
                display: 'flex',
              }} />
              {/* Grade chars stacked vertically inside circle — each char in its own div */}
              {grade.length === 1 ? (
                <div style={{ fontSize: circleFontSize, fontWeight: 700, color, lineHeight: 1, display: 'flex' }}>
                  {grade}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                  <div style={{ fontSize: circleFontSize, fontWeight: 700, color, lineHeight: 1, display: 'flex' }}>
                    {grade.charAt(0)}
                  </div>
                  <div style={{ fontSize: circleFontSize, fontWeight: 700, color, lineHeight: 1, display: 'flex' }}>
                    {grade.charAt(1)}
                  </div>
                </div>
              )}
            </div>

            {/* Grade English label below circle */}
            <div style={{
              fontSize: 18,
              color,
              letterSpacing: '0.22em',
              opacity: 0.75,
              display: 'flex',
              whiteSpace: 'nowrap',
            }}>
              {gradeEn}
            </div>
          </div>

          {/* Right: text block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 540 }}>
            {/* App label */}
            <div style={{
              fontSize: 18,
              color: 'rgba(26,20,52,0.38)',
              letterSpacing: '0.32em',
              display: 'flex',
            }}>
              ONCHAIN OMIKUJI
            </div>

            {/* 御籤 */}
            <div style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#1A1434',
              letterSpacing: '0.12em',
              lineHeight: 1.05,
              marginTop: 6,
              display: 'flex',
            }}>
              御籤
            </div>

            {/* Gold divider */}
            <div style={{
              width: 160,
              height: 3,
              background: '#D4A017',
              opacity: 0.65,
              marginTop: 12,
              marginBottom: 16,
              display: 'flex',
            }} />

            {/* Headline */}
            {shortHeadline ? (
              <div style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'rgba(26,20,52,0.80)',
                lineHeight: 1.4,
                display: 'flex',
                maxWidth: 520,
              }}>
                {shortHeadline}
              </div>
            ) : null}

            {/* Body text */}
            {shortBody ? (
              <div style={{
                fontSize: 18,
                color: 'rgba(26,20,52,0.60)',
                lineHeight: 1.5,
                marginTop: 10,
                display: 'flex',
                maxWidth: 520,
              }}>
                {shortBody}
              </div>
            ) : null}

            {/* Sub caption */}
            <div style={{
              fontSize: 16,
              color: 'rgba(26,20,52,0.28)',
              letterSpacing: '0.04em',
              marginTop: 14,
              display: 'flex',
            }}>
              Draw your fortune from the Base chain
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 80,
            paddingBottom: 60,
          }}
        >
          <div style={{ fontSize: 36, color: 'rgba(26,20,52,0.4)', letterSpacing: '0.3em', display: 'flex' }}>
            ONCHAIN OMIKUJI
          </div>
          <div style={{ fontSize: 120, fontWeight: 700, color: '#1A1434', letterSpacing: '0.1em', lineHeight: 1.1, display: 'flex' }}>
            御籤
          </div>
          <div style={{ width: 300, height: 4, background: '#D4A017', opacity: 0.7, marginTop: 16, display: 'flex' }} />
        </div>

        {/* Lanterns */}
        <div style={{ display: 'flex', gap: 120, marginBottom: 100, alignItems: 'flex-start' }}>
          {/* Lantern 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 4, height: 50, background: 'rgba(26,20,52,0.3)', display: 'flex' }} />
            <div style={{ width: 80, height: 120, background: '#C8102E', borderRadius: '50%', border: '6px solid rgba(139,0,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 48, color: 'rgba(245,237,216,0.6)', fontWeight: 700, display: 'flex' }}>籤</div>
            </div>
            <div style={{ width: 4, height: 40, background: '#D4A017', display: 'flex' }} />
            <div style={{ width: 20, height: 30, background: '#D4A017', opacity: 0.7, display: 'flex' }} />
          </div>
          {/* Lantern 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            <div style={{ width: 4, height: 50, background: 'rgba(26,20,52,0.3)', display: 'flex' }} />
            <div style={{ width: 80, height: 120, background: '#C8102E', borderRadius: '50%', border: '6px solid rgba(139,0,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 48, color: 'rgba(245,237,216,0.6)', fontWeight: 700, display: 'flex' }}>運</div>
            </div>
            <div style={{ width: 4, height: 40, background: '#D4A017', display: 'flex' }} />
            <div style={{ width: 20, height: 30, background: '#D4A017', opacity: 0.7, display: 'flex' }} />
          </div>
          {/* Lantern 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 4, height: 50, background: 'rgba(26,20,52,0.3)', display: 'flex' }} />
            <div style={{ width: 80, height: 120, background: '#C8102E', borderRadius: '50%', border: '6px solid rgba(139,0,20,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 48, color: 'rgba(245,237,216,0.6)', fontWeight: 700, display: 'flex' }}>福</div>
            </div>
            <div style={{ width: 4, height: 40, background: '#D4A017', display: 'flex' }} />
            <div style={{ width: 20, height: 30, background: '#D4A017', opacity: 0.7, display: 'flex' }} />
          </div>
        </div>

        {/* Message */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginBottom: 80 }}>
          <div style={{ fontSize: 52, color: '#1A1434', fontWeight: 400, display: 'flex' }}>
            Connect your wallet to reveal
          </div>
          <div style={{ fontSize: 56, color: '#C8102E', fontWeight: 700, display: 'flex' }}>
            your fortune
          </div>
          <div style={{ fontSize: 36, color: 'rgba(26,20,52,0.4)', marginTop: 8, display: 'flex' }}>
            We analyze your Base chain activity
          </div>
        </div>

        {/* Wallet buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 900, marginBottom: 60 }}>
          {/* Coinbase Wallet */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#FEFAF2', border: '2px solid rgba(26,20,52,0.12)', borderRadius: 16, paddingTop: 36, paddingBottom: 36, paddingLeft: 48, paddingRight: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, background: 'white', borderRadius: 8, display: 'flex' }} />
            </div>
            <div style={{ fontSize: 44, color: '#1A1434', fontWeight: 700, flex: 1, display: 'flex' }}>Coinbase Wallet</div>
            <div style={{ fontSize: 44, color: 'rgba(26,20,52,0.3)', display: 'flex' }}>›</div>
          </div>
          {/* MetaMask */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#FEFAF2', border: '2px solid rgba(26,20,52,0.12)', borderRadius: 16, paddingTop: 36, paddingBottom: 36, paddingLeft: 48, paddingRight: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F6851B', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 36, height: 36, background: 'white', borderRadius: 4, opacity: 0.9, display: 'flex' }} />
            </div>
            <div style={{ fontSize: 44, color: '#1A1434', fontWeight: 700, flex: 1, display: 'flex' }}>MetaMask</div>
            <div style={{ fontSize: 44, color: 'rgba(26,20,52,0.3)', display: 'flex' }}>›</div>
          </div>
          {/* WalletConnect */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, background: '#FEFAF2', border: '2px solid rgba(26,20,52,0.12)', borderRadius: 16, paddingTop: 36, paddingBottom: 36, paddingLeft: 48, paddingRight: 48 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#3B99FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 36, height: 20, background: 'white', borderRadius: 10, opacity: 0.9, display: 'flex' }} />
            </div>
            <div style={{ fontSize: 44, color: '#1A1434', fontWeight: 700, flex: 1, display: 'flex' }}>WalletConnect</div>
            <div style={{ fontSize: 44, color: 'rgba(26,20,52,0.3)', display: 'flex' }}>›</div>
          </div>
        </div>

        <div style={{ fontSize: 34, color: 'rgba(26,20,52,0.3)', display: 'flex' }}>
          Signature only. No transaction required.
        </div>

        {/* Corner ornaments */}
        <div style={{ position: 'absolute', top: 100, left: 40, width: 60, height: 60, borderTop: '4px solid rgba(200,16,46,0.2)', borderLeft: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 100, right: 40, width: 60, height: 60, borderTop: '4px solid rgba(200,16,46,0.2)', borderRight: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 60, height: 60, borderBottom: '4px solid rgba(200,16,46,0.2)', borderLeft: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 60, height: 60, borderBottom: '4px solid rgba(200,16,46,0.2)', borderRight: '4px solid rgba(200,16,46,0.2)', display: 'flex' }} />

        {/* Bottom crimson bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: W, height: 12, background: '#C8102E', display: 'flex' }} />
      </div>
    ),
    { width: W, height: H }
  );
}

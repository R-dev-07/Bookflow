import Link from 'next/link';
import { THEME } from '@/lib/theme';
import { Cookie, Settings, HelpCircle, Shield } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>LEGAL</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Cookie Policy</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          BookFlow uses small browser data files to keep the site useful, secure, and easy to navigate.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 32,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: 'rgba(192,138,62,0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Cookie size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>What cookies do</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  Cookies can remember session state, preferences, and basic interaction information so pages load consistently.
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 32,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: 'rgba(192,138,62,0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Settings size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Your controls</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  You can manage cookies through your browser settings. Blocking some cookies may affect sign-in and booking workflows.
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 32,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: 'rgba(192,138,62,0.2)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Shield size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Privacy & security</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  We use cookies to enhance security and prevent fraudulent activity. Your data is protected according to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: 56,
          background: 'rgba(192,138,62,0.1)', 
          borderRadius: 20, 
          padding: 28,
          border: '1px solid rgba(192,138,62,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Have questions about cookies?</h3>
            <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
              For questions about cookies or privacy, contact the BookFlow team.
            </p>
          </div>
          <Link href="/contact" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <button style={{
              background: THEME.brass,
              color: THEME.ink,
              border: 'none',
              borderRadius: 999,
              padding: '14px 28px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <HelpCircle size={18} />
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

import { THEME } from '@/lib/theme';
import { Shield, Lock, UserCheck, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>LEGAL</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Privacy Policy</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          This page explains the information BookFlow uses to provide a reliable event marketplace.
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
                <FileText size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Information we use</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  We use account, contact, booking, and listing information to provide the marketplace, support reservations, and keep the service secure.
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
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>How we protect it</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  Access is limited to the people and systems that need information to operate BookFlow. We do not sell personal information.
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
                <UserCheck size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Your choices</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  Contact us to request an update or deletion of your account information, subject to records we must retain for legal or security reasons.
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
        }}>
          <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.85)', lineHeight: 1.6, textAlign: 'center' }}>
            Last updated: January 2025. We may update this policy as our service evolves.
          </p>
        </div>
      </div>
    </div>
  );
}

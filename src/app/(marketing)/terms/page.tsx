import { THEME } from '@/lib/theme';
import { FileText, Users, AlertCircle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>LEGAL</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Terms of Service</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          These terms describe the basic rules for using BookFlow as a customer or provider.
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
                <CheckCircle size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Using BookFlow</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  Use accurate account and listing information, communicate respectfully, and only make reservations you intend to honor.
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
                <Users size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Providers and customers</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  Providers are responsible for the accuracy of their offers and availability. Customers are responsible for the information in their booking requests and for reviewing provider terms.
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
                <AlertCircle size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Service availability</h2>
                <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                  We work to keep BookFlow available and accurate, but marketplace listings and provider availability can change.
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
            By using BookFlow, you agree to these terms. Last updated: January 2025.
          </p>
        </div>
      </div>
    </div>
  );
}

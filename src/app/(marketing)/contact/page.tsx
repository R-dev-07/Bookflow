import { THEME } from '@/lib/theme';
import { BtnPrimary } from '@/components/shared/buttons';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>SUPPORT</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Contact BookFlow</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          We are here to help with bookings, provider listings, and anything that makes planning your event easier.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 56 }}>
          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 28,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              background: 'rgba(192,138,62,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Mail size={24} style={{ color: THEME.brass }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Email</h3>
              <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
                hello@bookflow.example
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 28,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              background: 'rgba(192,138,62,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Phone size={24} style={{ color: THEME.brass }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Phone</h3>
              <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
                +260 XXX XXX XXX
              </p>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 28,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 12, 
              background: 'rgba(192,138,62,0.2)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <MapPin size={24} style={{ color: THEME.brass }} />
            </div>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Location</h3>
              <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
                Lusaka, Zambia
              </p>
            </div>
          </div>
        </div>

        <section style={{ marginBottom: 56 }}>
          <h2 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 24 }}>Send us a message</h2>
          <form 
            style={{ 
              background: 'rgba(237,230,214,0.08)', 
              borderRadius: 20, 
              padding: 32,
              border: '1px solid rgba(244,239,227,0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: 24
            }}
            action="mailto:hello@bookflow.example" 
            method="post" 
            encType="text/plain"
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.off, letterSpacing: '0.08em' }}>NAME</label>
                <input 
                  name="name" 
                  required 
                  className="bf-input"
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 16px',
                    background: 'rgba(237,230,214,0.1)',
                    borderRadius: 12,
                    border: '1px solid rgba(244,239,227,0.2)',
                    color: THEME.off,
                    fontSize: 14,
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.off, letterSpacing: '0.08em' }}>EMAIL</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className="bf-input"
                  style={{
                    width: '100%',
                    height: 48,
                    padding: '0 16px',
                    background: 'rgba(237,230,214,0.1)',
                    borderRadius: 12,
                    border: '1px solid rgba(244,239,227,0.2)',
                    color: THEME.off,
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.off, letterSpacing: '0.08em' }}>HOW CAN WE HELP?</label>
              <textarea 
                name="message" 
                required 
                className="bf-input"
                style={{
                  width: '100%',
                  minHeight: 150,
                  padding: '16px',
                  background: 'rgba(237,230,214,0.1)',
                  borderRadius: 12,
                  border: '1px solid rgba(244,239,227,0.2)',
                  color: THEME.off,
                  fontSize: 14,
                  resize: 'vertical',
                }}
              />
            </div>
            <BtnPrimary style={{ width: 'fit-content', alignSelf: 'flex-start' }}>
              <Send size={18} />
              Open email draft
            </BtnPrimary>
          </form>
        </section>

        <div style={{ 
          background: 'rgba(192,138,62,0.1)', 
          borderRadius: 20, 
          padding: 24,
          border: '1px solid rgba(192,138,62,0.3)',
        }}>
          <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.85)', lineHeight: 1.6, textAlign: 'center' }}>
            We aim to reply within one business day. For urgent matters, please call us directly.
          </p>
        </div>
      </div>
    </div>
  );
}

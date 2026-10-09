import Link from 'next/link';
import { THEME } from '@/lib/theme';
import { BookOpen, Calendar, DollarSign, MessageCircle, ArrowRight } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>SUPPORT</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>How can we help?</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          Find a quick answer or get in touch with the team managing your BookFlow experience.
        </p>

        <section style={{ marginBottom: 56 }}>
          <h2 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Quick Start Guide</h2>
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
                <BookOpen size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Browse & Explore</h3>
                <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
                  Browse venues and services, open a listing for its full gallery and details.
                </p>
              </div>
            </div>
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
                <Calendar size={24} style={{ color: THEME.brass }} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Reserve Your Choice</h3>
                <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
                  Choose Reserve to begin a booking request. You will not be charged until the provider confirms.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 56 }}>
          <h2 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Booking Help</h2>
          <div style={{ 
            background: 'rgba(237,230,214,0.08)', 
            borderRadius: 20, 
            padding: 32,
            border: '1px solid rgba(244,239,227,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: THEME.brass }} />
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                Use the booking form to share your date, guest count, event type, and notes.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: THEME.brass }} />
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                Providers review requests and confirm availability before payment is due.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: THEME.brass }} />
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                Review cancellation terms on the listing before submitting your request.
              </p>
            </div>
          </div>
        </section>

        <div style={{ 
          background: 'rgba(192,138,62,0.1)', 
          borderRadius: 20, 
          padding: 32,
          border: '1px solid rgba(192,138,62,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Still need help?</h3>
            <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
              Visit our Contact page and tell us what happened.
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
              <MessageCircle size={18} />
              Contact Us
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { Check, ArrowRight, TrendingUp, Shield, Users, Zap, Building2, Star } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Increase Your Bookings',
    description: 'Reach thousands of event planners actively looking for venues and services like yours.',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Get paid on time with our secure escrow system. Funds are held safely until the event is completed.',
  },
  {
    icon: Users,
    title: 'Build Your Reputation',
    description: 'Collect verified reviews from satisfied clients and showcase your rating to attract more business.',
  },
  {
    icon: Zap,
    title: 'Easy Management',
    description: 'Manage your listings, bookings, and dates all in one intuitive dashboard.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Sign up and create your provider profile with your business details and location.',
  },
  {
    step: '02',
    title: 'List Your Services or Venue',
    description: 'Add your venues or services with photos, video tours, pricing, and open dates.',
  },
  {
    step: '03',
    title: 'Start Receiving Bookings',
    description: 'Review booking requests, agree on terms with clients, and grow your revenue.',
  },
];

const stats = [
  { label: 'Verified Providers', value: '50,000+' },
  { label: 'Bookings Processed', value: '100,000+' },
  { label: 'Average Client Rating', value: '4.9 / 5' },
  { label: 'Revenue Generated', value: 'K50M+' },
];

export default function BecomeAProviderPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    category: 'venue',
    city: 'Lusaka',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      {/* Action Bar */}
      <section style={{ padding: '16px 40px', borderBottom: '1px solid rgba(244,239,227,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <BackButton fallbackUrl="/" label="Back to Home" />
        </div>
      </section>

      {/* Hero Section */}
      <section style={{ padding: '60px 40px 80px', maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <div
          className="bf-stamp"
          style={{
            display: 'inline-block',
            fontSize: 12,
            fontWeight: 700,
            padding: '6px 16px',
            borderRadius: 6,
            marginBottom: 20,
          }}
        >
          JOIN OUR NETWORK
        </div>

        <h1
          className="bf-display"
          style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 600,
            color: THEME.off,
            margin: '0 auto 20px',
            maxWidth: 820,
            lineHeight: 1.1,
          }}
        >
          Turn open dates into confirmed bookings.
        </h1>

        <p
          style={{
            fontSize: 18,
            color: 'rgba(244,239,227,0.7)',
            maxWidth: 620,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          List your venue or event service on BookFlow and connect with thousands of planners actively looking for trusted providers.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#apply-form" style={{ textDecoration: 'none' }}>
            <BtnPrimary style={{ padding: '14px 28px' }}>
              Apply as a Provider <ArrowRight size={16} />
            </BtnPrimary>
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid rgba(244,239,227,0.12)', borderBottom: '1px solid rgba(244,239,227,0.12)', background: THEME.ink2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="bf-mono" style={{ fontSize: 36, fontWeight: 700, color: THEME.brass, marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '80px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
          <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>
            Why Providers Choose BookFlow
          </h2>
          <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16 }}>
            Everything you need to showcase, manage, and scale your event business.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                style={{
                  background: 'rgba(237,230,214,0.08)',
                  borderRadius: 20,
                  padding: 32,
                  border: '1px solid rgba(244,239,227,0.12)',
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(192,138,62,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={24} style={{ color: THEME.brass }} />
                </div>
                <h3 className="bf-display" style={{ fontSize: 20, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>{b.title}</h3>
                <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 14, lineHeight: 1.6 }}>{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 40px', background: THEME.ink2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>
              How It Works
            </h2>
            <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16 }}>
              Get listed and start receiving booking requests in three simple steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {steps.map((step) => (
              <div
                key={step.step}
                className="stub stub-notch-t stub-notch-b"
                style={{
                  background: THEME.paper,
                  borderRadius: 20,
                  padding: 32,
                  color: THEME.inkText,
                }}
              >
                <div className="bf-mono" style={{ fontSize: 14, color: THEME.stamp, fontWeight: 700, marginBottom: 16 }}>
                  STEP {step.step}
                </div>
                <h3 className="bf-display" style={{ fontSize: 22, fontWeight: 600, color: THEME.inkText, marginBottom: 10 }}>
                  {step.title}
                </h3>
                <p style={{ color: THEME.muted, fontSize: 14, lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" style={{ padding: '80px 40px 100px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 24, padding: 40, border: '1px solid rgba(244,239,227,0.12)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
              Ready to Join BookFlow?
            </h2>
            <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 15 }}>
              Submit your provider details below and our team will verify your listing.
            </p>
          </div>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 64, height: 64, borderRadius: 999, background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#22c55e' }}>
                <Check size={32} />
              </div>
              <h3 className="bf-display" style={{ fontSize: 26, color: THEME.off, marginBottom: 8 }}>Application Received!</h3>
              <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
                Thank you for applying to become a BookFlow provider. Our team will review your business details and reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>BUSINESS OR PROVIDER NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Gardens & Events"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>PHONE / WHATSAPP</label>
                  <input
                    type="tel"
                    required
                    placeholder="+260 97 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>SERVICE CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  >
                    <option value="venue" style={{ background: THEME.ink2 }}>Venue & Space Rental</option>
                    <option value="photography" style={{ background: THEME.ink2 }}>Photography & Videography</option>
                    <option value="catering" style={{ background: THEME.ink2 }}>Catering & Beverages</option>
                    <option value="entertainment" style={{ background: THEME.ink2 }}>Live Band / DJ / Entertainment</option>
                    <option value="planning" style={{ background: THEME.ink2 }}>Event Planning & Coordination</option>
                    <option value="decor" style={{ background: THEME.ink2 }}>Decor & Design</option>
                  </select>
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>CITY / REGION</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', height: 48, padding: '0 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                  >
                    <option value="Lusaka" style={{ background: THEME.ink2 }}>Lusaka</option>
                    <option value="Ndola" style={{ background: THEME.ink2 }}>Ndola</option>
                    <option value="Kitwe" style={{ background: THEME.ink2 }}>Kitwe</option>
                    <option value="Livingstone" style={{ background: THEME.ink2 }}>Livingstone</option>
                    <option value="Other" style={{ background: THEME.ink2 }}>Other Region in Zambia</option>
                  </select>
                </div>
              </div>

              <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', marginTop: 12 }}>
                Submit Application <ArrowRight size={16} />
              </BtnPrimary>

              <p style={{ fontSize: 12, color: 'rgba(244,239,227,0.5)', textAlign: 'center' }}>
                By submitting, you agree to BookFlow Provider Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

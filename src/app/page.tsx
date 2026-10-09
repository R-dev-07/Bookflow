'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import {
  Search, MapPin, Calendar, Star, ArrowRight, Check, ChevronDown,
} from 'lucide-react';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';

/* ---------------------------------------------------------------------- */
/* Data Constants                                                         */
/* ---------------------------------------------------------------------- */

const STATS = [
  { label: 'Venues listed', value: '10,000+' },
  { label: 'Services available', value: '5,000+' },
  { label: 'Events booked', value: '50,000+' },
  { label: 'Avg. reply time', value: '< 3 hrs' },
];

const VENUES = [
  { id: 1, name: 'Grand Ballroom', location: 'Lusaka, Zambia', capacity: 500, price: 'K15,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500' },
  { id: 2, name: 'Garden Pavilion', location: 'Ndola, Zambia', capacity: 150, price: 'K20,800', rating: 4.8, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500' },
  { id: 3, name: 'Skyline Rooftop', location: 'Kitwe, Zambia', capacity: 200, price: 'K31,200', rating: 4.7, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500' },
];

const SERVICES = [
  { id: 1, name: 'Professional Photography', category: 'Photography', price: 'K7,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500' },
  { id: 2, name: 'Gourmet Catering', category: 'Catering', price: 'K9,000', rating: 4.8, image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=500' },
  { id: 3, name: 'Live Band', category: 'Entertainment', price: 'K12,000', rating: 4.7, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500' },
];

const STEPS = [
  { n: '01', title: 'Search venues and services', desc: 'Filter by location, date, and headcount. Every listing shows real, current availability.', icon: Search },
  { n: '02', title: 'Compare and shortlist', desc: 'Save the ones you like, check reviews from other planners, and weigh price against capacity.', icon: Star },
  { n: '03', title: 'Confirm your booking', desc: 'Send a request, agree on terms with the provider, and get your confirmation done.', icon: Check },
];

const FAQ = [
  { id: 'faq-1', q: 'How do I book a venue or service?', a: 'Browse listings, add the ones you like to your shortlist, and send a booking request. Providers reply with availability and pricing, and once you agree on terms your booking is confirmed.' },
  { id: 'faq-2', q: 'Is there a fee to use BookFlow?', a: 'BookFlow is free for event planners. We charge a small service fee to providers, and only once a booking is completed through the platform.' },
  { id: 'faq-3', q: 'How are payments handled?', a: 'Payments are processed securely and held in escrow until your event is completed, so both you and the provider are protected.' },
  { id: 'faq-4', q: 'Can I cancel my booking?', a: 'Cancellation terms are set by each provider and shown on their listing. Cancel within the stated window for a full or partial refund.' },
];

/* ---------------------------------------------------------------------- */
/* Components                                                             */
/* ---------------------------------------------------------------------- */

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined' || !ref.current) return;
    
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SearchField({ label, icon: Icon, placeholder, type = "text", dashed = false }) {
  return (
    <div className={dashed ? "dashed-v" : ""} style={{ padding: '22px 24px' }}>
      <label className="bf-mono" style={{ fontSize: 11, color: THEME.muted, letterSpacing: '0.08em' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <Icon size={16} style={{ color: THEME.muted, flexShrink: 0 }} />
        <input className="bf-input" type={type} placeholder={placeholder} />
      </div>
    </div>
  );
}

function RatingStamp({ rating }) {
  return (
    <div
      className="bf-mono"
      style={{
        background: THEME.ink,
        color: THEME.off,
        borderRadius: 999,
        padding: '6px 12px',
        fontSize: 12,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Star size={12} style={{ fill: THEME.brass, color: THEME.brass }} />
      {rating}
    </div>
  );
}

function ListingCard({ item, kind }) {
  const isVenue = kind === 'venue';

  return (
    <div
      className="bf-card stub stub-notch-t stub-notch-b"
      style={{ background: THEME.paper, borderRadius: 20, overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', height: 200 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {!isVenue && (
          <span
            className="bf-mono"
            style={{
              position: 'absolute', top: 14, left: 14,
              background: THEME.off, color: THEME.inkText,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
              padding: '5px 10px', borderRadius: 999,
            }}
          >
            {item.category}
          </span>
        )}
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <RatingStamp rating={item.rating} />
        </div>
        <div
          className="bf-card-stamp bf-stamp"
          style={{
            position: 'absolute', bottom: 14, right: 14,
            fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
            background: 'rgba(237,230,214,0.92)',
          }}
        >
          OPEN DATES
        </div>
      </div>

      <div style={{ padding: '22px 22px 4px' }}>
        <h3 className="bf-display" style={{ fontSize: 20, fontWeight: 600, color: THEME.inkText, margin: '0 0 6px' }}>
          {item.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.muted, fontSize: 14 }}>
          {isVenue ? (
            <><MapPin size={15} /> {item.location}</>
          ) : (
            item.category
          )}
        </div>
      </div>

      <div className="dashed-h" style={{ margin: '18px 22px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px 22px' }}>
        <div className="bf-mono" style={{ fontSize: 13, color: THEME.muted }}>
          {isVenue ? `${item.capacity} guests` : 'from'}
        </div>
        <div className="bf-mono" style={{ fontSize: 18, fontWeight: 600, color: THEME.stamp }}>
          {item.price}
        </div>
      </div>
    </div>
  );
}

function FaqRow({ item, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid rgba(244,239,227,0.15)` }}>
      <button
        onClick={onToggle}
        className="bf-acc-trigger"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '22px 4px', color: THEME.off, textAlign: 'left',
        }}
      >
        <span className="bf-display" style={{ fontSize: 18, fontWeight: 600 }}>{item.q}</span>
        <ChevronDown
          size={20}
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
            transition: 'transform 0.25s ease', 
            flexShrink: 0, 
            marginLeft: 16 
          }}
        />
      </button>
      <div 
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        style={{ 
          maxHeight: isOpen ? 200 : 0, 
          overflow: 'hidden', 
          transition: 'max-height 0.3s ease' 
        }}
      >
        <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 15, lineHeight: 1.7, padding: '0 4px 22px', maxWidth: 640 }}>
          {item.a}
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Main Page                                                              */
/* ---------------------------------------------------------------------- */

export default function BookFlowLanding() {
  const [openFaq, setOpenFaq] = useState('faq-1');
  const { isSignedIn } = useAuth();

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ padding: '60px 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <h1
            className="bf-display"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 600, color: THEME.off, lineHeight: 1.05, maxWidth: 820, margin: '0 0 24px' }}
          >
            Every great event starts with a booking that just works.
          </h1>
          <p style={{ fontSize: 19, color: 'rgba(244,239,227,0.7)', maxWidth: 560, lineHeight: 1.6, margin: '0 0 48px' }}>
            Search venues and vetted services, compare real availability, and lock in your date, no back-and-forth emails required.
          </p>
        </Reveal>

        {/* Ticket Search Bar */}
        <Reveal delay={120}>
          <div
            className="stub stub-notch-l stub-notch-r bf-search-bar"
            style={{
              background: THEME.paper,
              borderRadius: 20,
              display: 'grid',
              alignItems: 'center',
              maxWidth: 980,
            }}
          >
            <SearchField label="WHAT" icon={Search} placeholder="Wedding, conference…" />
            <SearchField label="WHERE" icon={MapPin} placeholder="Lusaka, Ndola..." dashed />
            <SearchField label="WHEN" icon={Calendar} type="date" dashed />
            
            <div style={{ padding: '0 16px' }}>
              <BtnPrimary style={{ width: '100%' }}>
                Find availability <ArrowRight size={16} />
              </BtnPrimary>
            </div>
          </div>
        </Reveal>

        {/* Quick Navigation */}
        <Reveal delay={200}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32 }}>
            <Link href="/venues" style={{ textDecoration: 'none' }}>
              <BtnGhost variant="dark">Browse Venues</BtnGhost>
            </Link>
            <Link href="/services" style={{ textDecoration: 'none' }}>
              <BtnGhost variant="dark">Find Services</BtnGhost>
            </Link>
            {isSignedIn ? (
              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <BtnPrimary>Go to Dashboard</BtnPrimary>
              </Link>
            ) : (
              <>
                <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                  <BtnGhost variant="dark">Sign In</BtnGhost>
                </Link>
                <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                  <BtnPrimary>Sign Up</BtnPrimary>
                </Link>
              </>
            )}
          </div>
        </Reveal>
      </section>

      {/* Stats Section */}
      <section style={{ borderTop: '1px solid rgba(244,239,227,0.12)', borderBottom: '1px solid rgba(244,239,227,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="bf-mono" style={{ fontSize: 34, fontWeight: 600, color: THEME.brass, marginBottom: 6 }}>{s.value}</div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)' }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Venues Grid */}
      <section style={{ padding: '100px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, margin: '0 0 8px' }}>Venues with open dates</h2>
              <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16 }}>Our most-booked spaces this month</p>
            </div>
            <Link href="/venues" style={{ color: THEME.brass, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              View all venues <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {VENUES.map((v, i) => (
            <Reveal key={v.id} delay={i * 100}>
              <ListingCard item={v} kind="venue" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '40px 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, margin: '0 0 8px' }}>Services ready to book</h2>
              <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16 }}>Photographers, caterers, and entertainers, vetted</p>
            </div>
            <Link href="/services" style={{ color: THEME.brass, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              View all services <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={i * 100}>
              <ListingCard item={s} kind="service" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section style={{ padding: '100px 40px', background: THEME.ink2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ maxWidth: 560, marginBottom: 56 }}>
              <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, margin: '0 0 12px' }}>Search, compare, confirm</h2>
              <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16, lineHeight: 1.6 }}>Three steps between you and a booked event.</p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.n} delay={i * 120}>
                  <div className="bf-mono" style={{ fontSize: 14, color: THEME.brass, marginBottom: 16 }}>{step.n}</div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(192,138,62,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon size={20} style={{ color: THEME.brass }} />
                  </div>
                  <h3 className="bf-display" style={{ fontSize: 20, fontWeight: 600, color: THEME.off, margin: '0 0 10px' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(244,239,227,0.6)', fontSize: 15, lineHeight: 1.6 }}>{step.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '100px 40px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal>
            <h2 className="bf-display" style={{ fontSize: 34, fontWeight: 600, color: THEME.off, margin: '0 0 8px', textAlign: 'center' }}>Frequently asked questions</h2>
            <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16, textAlign: 'center', marginBottom: 48 }}>Everything you need to know about BookFlow</p>
          </Reveal>
          <div style={{ borderTop: '1px solid rgba(244,239,227,0.15)' }}>
            {FAQ.map((item) => (
              <FaqRow
                key={item.id}
                item={item}
                isOpen={openFaq === item.id}
                onToggle={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section style={{ padding: '40px 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div
            className="stub stub-notch-t stub-notch-b"
            style={{
              background: THEME.paper,
              borderRadius: 24,
              padding: '64px 48px',
              textAlign: 'center',
              maxWidth: 780,
              margin: '0 auto',
            }}
          >
            <div
              className="bf-stamp"
              style={{
                display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '6px 16px',
                borderRadius: 6, marginBottom: 24,
              }}
            >
              READY TO BOOK
            </div>
            <h2 className="bf-display" style={{ fontSize: 38, fontWeight: 600, color: THEME.inkText, margin: '0 0 16px' }}>
              Your event is one booking away.
            </h2>
            <p style={{ color: THEME.muted, fontSize: 16, maxWidth: 480, margin: '0 auto 36px', lineHeight: 1.6 }}>
              Join thousands of planners who use BookFlow to find and book venues and services without the runaround.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/venues">
                <BtnPrimary>Explore venues <ArrowRight size={16} /></BtnPrimary>
              </Link>
              <Link href="/services">
                <BtnGhost variant="dark">Browse services</BtnGhost>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Provider Banner */}
      <section style={{ padding: '0 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48, alignItems: 'center', background: THEME.ink2, borderRadius: 24, padding: '56px 48px' }}>
            <div>
              <h2 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off, margin: '0 0 16px' }}>
                Turn empty dates into bookings
              </h2>
              <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
                List your venue or services on BookFlow and reach thousands of event planners actively searching.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Reach a wider audience', 'Manage bookings in one place', 'Build your reputation with reviews', 'Get paid through secure escrow'].map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(244,239,227,0.85)', fontSize: 15 }}>
                    <Check size={16} style={{ color: THEME.brass, flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/become-a-provider">
                <BtnPrimary>Become a provider <ArrowRight size={16} /></BtnPrimary>
              </Link>
            </div>
            <div className="stub stub-notch-l stub-notch-r" style={{ background: THEME.paper, borderRadius: 20, padding: '36px 32px', textAlign: 'center' }}>
              <div className="bf-mono" style={{ fontSize: 40, fontWeight: 600, color: THEME.stamp, marginBottom: 4 }}>50,000+</div>
              <div style={{ color: THEME.muted, fontSize: 14, marginBottom: 28 }}>Providers on BookFlow</div>
              <div className="dashed-h" style={{ paddingTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div className="bf-mono" style={{ fontSize: 24, fontWeight: 600, color: THEME.inkText }}>95%</div>
                  <div style={{ fontSize: 13, color: THEME.muted }}>Satisfaction rate</div>
                </div>
                <div>
                  <div className="bf-mono" style={{ fontSize: 24, fontWeight: 600, color: THEME.inkText }}>2x</div>
                  <div style={{ fontSize: 13, color: THEME.muted }}>More bookings</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer style={{ padding: '32px 40px', textAlign: 'center', color: 'rgba(244,239,227,0.4)', fontSize: 13 }}>
        BookFlow: Event booking confirmed at the tip of your hands.
      </footer>
    </div>
  );
}
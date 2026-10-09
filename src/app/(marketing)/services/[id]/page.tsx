'use client';

import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { MapPin, DollarSign, Star, Calendar, Check, Clock } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockService = {
  id: 1,
  name: 'Professional Photography',
  category: 'Photography',
  location: 'Lusaka, Zambia',
  price: 39000,
  rating: 4.9,
  reviewCount: 128,
  description: 'Award-winning photography for weddings, corporate events, and special occasions. With over 10 years of experience, our team captures every precious moment with artistic flair and technical excellence. We provide full-day coverage, edited digital galleries, and optional photo albums.',
  images: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
  ],
  serviceArea: ['Lusaka', 'Ndola', 'Kitwe'],
  travelRadius: 160,
  minimumLeadTime: 14,
  pricingTiers: [
    { name: 'Bronze', price: 39000, duration: 240, description: '4 hours coverage' },
    { name: 'Silver', price: 65000, duration: 480, description: '8 hours coverage' },
    { name: 'Gold', price: 104000, duration: 720, description: 'Full day coverage + album' },
  ],
  addOns: [
    { name: 'Second Shooter', price: 20800 },
    { name: 'Drone Coverage', price: 13000 },
    { name: 'Photo Album', price: 10400 },
  ],
  reviews: [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely stunning photos! The photographer was professional and captured every moment perfectly.',
      date: '2024-03-15',
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 5,
      comment: 'Great experience from start to finish. The photos exceeded our expectations.',
      date: '2024-02-20',
    },
    {
      id: 3,
      author: 'Emily Davis',
      rating: 4,
      comment: 'Beautiful work and very responsive team. Would definitely recommend.',
      date: '2024-01-10',
    },
  ],
};

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnName) 
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const basePrice = mockService.price;
  const addOnsTotal = selectedAddOns.reduce((sum, name) => {
    const addOn = mockService.addOns.find(a => a.name === name);
    return sum + (addOn?.price || 0);
  }, 0);
  const serviceFee = Math.round((basePrice + addOnsTotal) * 0.1);
  const totalPrice = basePrice + addOnsTotal + serviceFee;

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      {/* Back Button */}
      <section style={{ padding: '16px 40px', borderBottom: '1px solid rgba(244,239,227,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <BackButton fallbackUrl="/services" label="Back to Services" />
        </div>
      </section>

      {/* Image Gallery */}
      <section style={{ padding: '32px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden' }}>
              <img
                src={mockService.images[selectedImage]}
                alt={mockService.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {mockService.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: selectedImage === index ? `2px solid ${THEME.brass}` : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <img
                    src={image}
                    alt={`${mockService.name} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section style={{ padding: '32px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 8, letterSpacing: '0.08em' }}>{mockService.category}</div>
                    <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>{mockService.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(244,239,227,0.65)' }}>
                      <MapPin size={20} style={{ marginRight: 8 }} />
                      {mockService.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(237,230,214,0.1)', padding: '8px 16px', borderRadius: 12 }}>
                      <Star size={20} style={{ color: THEME.brass, fill: THEME.brass }} />
                      <span style={{ fontWeight: 600, color: THEME.off }}>{mockService.rating}</span>
                      <span style={{ color: 'rgba(244,239,227,0.65)' }}>({mockService.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, color: 'rgba(244,239,227,0.65)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DollarSign size={20} style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500, color: THEME.off }}>From {formatCurrency(mockService.price)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Clock size={20} style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500, color: THEME.off }}>{mockService.minimumLeadTime} days lead time</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>About This Service</h2>
                <p style={{ color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>{mockService.description}</p>
              </div>

              {/* Service Area */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Service Area</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mockService.serviceArea.map((area) => (
                    <span
                      key={area}
                      style={{
                        background: 'rgba(237,230,214,0.1)',
                        color: THEME.off,
                        borderRadius: 999,
                        padding: '6px 14px',
                        fontSize: 13,
                        fontWeight: 500,
                        border: '1px solid rgba(244,239,227,0.2)',
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)', marginTop: 12 }}>
                  Travel radius: {mockService.travelRadius} km across Zambia
                </p>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Pricing Packages</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mockService.pricingTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="stub"
                      style={{
                        background: 'rgba(237,230,214,0.08)',
                        borderRadius: 16,
                        padding: 20,
                        border: '1px solid rgba(244,239,227,0.12)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontWeight: 600, color: THEME.off }}>{tier.name}</h3>
                          <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)' }}>{tier.description}</p>
                          <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)' }}>{tier.duration / 60} hours</p>
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600, color: THEME.brass }}>{formatCurrency(tier.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {mockService.addOns.length > 0 && (
                <div>
                  <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Available Add-ons</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {mockService.addOns.map((addOn) => {
                      const isSelected = selectedAddOns.includes(addOn.name);
                      return (
                        <button
                          key={addOn.name}
                          onClick={() => toggleAddOn(addOn.name)}
                          className="stub"
                          style={{
                            background: isSelected ? 'rgba(192,138,62,0.2)' : 'rgba(237,230,214,0.08)',
                            borderRadius: 16,
                            padding: 20,
                            border: isSelected ? `2px solid ${THEME.brass}` : '1px solid rgba(244,239,227,0.12)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <div style={{
                                width: 24,
                                height: 24,
                                borderRadius: 999,
                                border: isSelected ? `2px solid ${THEME.brass}` : '2px solid rgba(244,239,227,0.3)',
                                background: isSelected ? THEME.brass : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                                {isSelected && <Check size={14} style={{ color: THEME.ink }} />}
                              </div>
                              <h3 style={{ fontWeight: 600, color: THEME.off }}>{addOn.name}</h3>
                            </div>
                            <div style={{ fontSize: 18, fontWeight: 600, color: isSelected ? THEME.brass : THEME.off }}>+{formatCurrency(addOn.price)}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Reviews */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Reviews</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {mockService.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="stub"
                      style={{
                        background: 'rgba(237,230,214,0.08)',
                        borderRadius: 16,
                        padding: 20,
                        border: '1px solid rgba(244,239,227,0.12)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div>
                          <div style={{ fontWeight: 600, color: THEME.off }}>{review.author}</div>
                          <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)' }}>{review.date}</div>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} style={{ color: THEME.brass, fill: THEME.brass }} />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: 'rgba(244,239,227,0.85)' }}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div
                className="stub"
                style={{
                  background: 'rgba(237,230,214,0.08)',
                  borderRadius: 20,
                  padding: 32,
                  position: 'sticky',
                  top: 20,
                  border: '1px solid rgba(244,239,227,0.12)',
                }}
              >
                <h3 className="bf-display" style={{ fontSize: 22, fontWeight: 600, color: THEME.off, marginBottom: 24 }}>Book This Service</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT DATE</label>
                    <input
                      type="date"
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
                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT TYPE</label>
                    <select
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
                    >
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Birthday Party</option>
                      <option>Conference</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>PACKAGE</label>
                    <select
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
                    >
                      {mockService.pricingTiers.map((tier) => (
                        <option key={tier.name} value={tier.name}>
                          {tier.name} - {formatCurrency(tier.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(244,239,227,0.12)', paddingTop: 24, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.off, marginBottom: 8 }}>
                    <span>Package Price</span>
                    <span>{formatCurrency(basePrice)}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.off, marginBottom: 8 }}>
                      <span>Add-ons ({selectedAddOns.length})</span>
                      <span>+{formatCurrency(addOnsTotal)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.off, marginBottom: 8 }}>
                    <span>Service Fee</span>
                    <span>{formatCurrency(serviceFee)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: THEME.off, fontSize: 18 }}>
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <Link href={`/dashboard/bookings/new?itemType=SERVICE&itemId=${id}&itemName=${encodeURIComponent(mockService.name)}&price=${totalPrice}&addOns=${encodeURIComponent(selectedAddOns.join(','))}`} style={{ textDecoration: 'none' }}>
                  <BtnPrimary style={{ width: '100%' }}>
                    Reserve This Service
                  </BtnPrimary>
                </Link>
                <p style={{ fontSize: 12, color: 'rgba(244,239,227,0.5)', textAlign: 'center', marginTop: 12 }}>
                  No payment required until booking is confirmed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

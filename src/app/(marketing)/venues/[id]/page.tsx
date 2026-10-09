'use client';

import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { MapPin, Users, DollarSign, Star, Check, Play, Film, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';
import { formatCurrency } from '@/lib/utils';

// Mock data - replace with actual API calls
const mockVenue = {
  id: 1,
  name: 'Grand Ballroom',
  location: 'Lusaka, Zambia',
  capacity: 500,
  price: 65000,
  rating: 4.9,
  reviewCount: 128,
  description: 'A stunning ballroom with crystal chandeliers, perfect for weddings, galas, and corporate events. Our venue features elegant decor, state-of-the-art lighting and sound systems, and a dedicated event coordination team to ensure your special occasion is flawless.',
  video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  images: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    'https://images.unsplash.com/photo-1519225421980-715cb0212128?w=800',
  ],
  amenities: ['Parking', 'WiFi', 'AV Equipment', 'Catering', 'Tables', 'Chairs', 'Stage', 'Dance Floor'],
  pricingTiers: [
    { name: 'Weekday', price: 65000, description: 'Monday through Thursday' },
    { name: 'Weekend', price: 104000, description: 'Friday through Sunday' },
  ],
  addOns: [
    { name: 'Premium Linens', price: 13000 },
    { name: 'Additional Lighting', price: 7800 },
    { name: 'Floral Arrangements', price: 20800 },
  ],
  reviews: [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely stunning venue! The staff was professional and everything was perfect for our wedding.',
      date: '2024-03-15',
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 5,
      comment: 'Great space for our corporate event. The AV equipment was top-notch and the location is convenient.',
      date: '2024-02-20',
    },
    {
      id: 3,
      author: 'Emily Davis',
      rating: 4,
      comment: 'Beautiful venue with excellent service. Would definitely recommend for special occasions.',
      date: '2024-01-10',
    },
  ],
};

export default function VenueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [selectedMediaMode, setSelectedMediaMode] = useState<'IMAGE' | 'VIDEO'>('IMAGE');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [eventDate, setEventDate] = useState('2024-07-20');
  const [guestCount, setGuestCount] = useState('150');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (addOnName: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnName) 
        ? prev.filter(name => name !== addOnName)
        : [...prev, addOnName]
    );
  };

  const basePrice = mockVenue.price;
  const addOnsTotal = selectedAddOns.reduce((sum, name) => {
    const addOn = mockVenue.addOns.find(a => a.name === name);
    return sum + (addOn?.price || 0);
  }, 0);
  const serviceFee = Math.round((basePrice + addOnsTotal) * 0.1);
  const totalPrice = basePrice + addOnsTotal + serviceFee;

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      {/* Back Button */}
      <section style={{ padding: '16px 40px', borderBottom: '1px solid rgba(244,239,227,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <BackButton fallbackUrl="/venues" label="Back to Venues" />
        </div>
      </section>

      {/* Media Gallery with Video Provision */}
      <section style={{ padding: '32px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <button
              onClick={() => setSelectedMediaMode('IMAGE')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 12,
                background: selectedMediaMode === 'IMAGE' ? THEME.brass : 'rgba(237,230,214,0.08)',
                color: selectedMediaMode === 'IMAGE' ? THEME.ink : THEME.off,
                border: '1px solid rgba(244,239,227,0.12)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <ImageIcon size={16} /> Photos
            </button>
            <button
              onClick={() => setSelectedMediaMode('VIDEO')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 12,
                background: selectedMediaMode === 'VIDEO' ? THEME.brass : 'rgba(237,230,214,0.08)',
                color: selectedMediaMode === 'VIDEO' ? THEME.ink : THEME.off,
                border: '1px solid rgba(244,239,227,0.12)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              <Film size={16} /> Video Tour
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {/* Main Display Player */}
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
              {selectedMediaMode === 'VIDEO' ? (
                <video
                  src={mockVenue.video}
                  controls
                  autoPlay
                  poster={mockVenue.images[0]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <img
                  src={mockVenue.images[selectedImageIndex]}
                  alt={mockVenue.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>

            {/* Gallery Selector Cards including Video Card Provision */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {/* Video Tour Card */}
              <button
                onClick={() => setSelectedMediaMode('VIDEO')}
                style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: selectedMediaMode === 'VIDEO' ? `2px solid ${THEME.brass}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s ease',
                  background: '#000',
                }}
              >
                <img
                  src={mockVenue.images[0]}
                  alt="Video Tour Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  background: 'rgba(0,0,0,0.4)',
                  color: THEME.off,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 999, background: THEME.brass, display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                    <Play size={18} style={{ color: THEME.ink, marginLeft: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em' }}>PLAY VIDEO TOUR</span>
                </div>
              </button>

              {/* Image Thumbnails */}
              {mockVenue.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedMediaMode('IMAGE');
                    setSelectedImageIndex(index);
                  }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: (selectedMediaMode === 'IMAGE' && selectedImageIndex === index) ? `2px solid ${THEME.brass}` : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                  }}
                >
                  <img
                    src={image}
                    alt={`${mockVenue.name} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venue Details */}
      <section style={{ padding: '32px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>{mockVenue.name}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(244,239,227,0.65)' }}>
                      <MapPin size={20} style={{ marginRight: 8 }} />
                      {mockVenue.location}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(237,230,214,0.1)', padding: '8px 16px', borderRadius: 12 }}>
                      <Star size={20} style={{ color: THEME.brass, fill: THEME.brass }} />
                      <span style={{ fontWeight: 600, color: THEME.off }}>{mockVenue.rating}</span>
                      <span style={{ color: 'rgba(244,239,227,0.65)' }}>({mockVenue.reviewCount})</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, color: 'rgba(244,239,227,0.65)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Users size={20} style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500, color: THEME.off }}>{mockVenue.capacity}</span> guests
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DollarSign size={20} style={{ marginRight: 8 }} />
                    <span style={{ fontWeight: 500, color: THEME.off }}>From {formatCurrency(mockVenue.price)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>About This Venue</h2>
                <p style={{ color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>{mockVenue.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Amenities</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                  {mockVenue.amenities.map((amenity) => (
                    <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: 8, color: THEME.off }}>
                      <Check size={20} style={{ color: THEME.brass }} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Pricing</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mockVenue.pricingTiers.map((tier) => (
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
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600, color: THEME.brass }}>{formatCurrency(tier.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              {mockVenue.addOns.length > 0 && (
                <div>
                  <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Available Add-ons</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {mockVenue.addOns.map((addOn) => {
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
                  {mockVenue.reviews.map((review) => (
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
                <h3 className="bf-display" style={{ fontSize: 22, fontWeight: 600, color: THEME.off, marginBottom: 24 }}>Book This Venue</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT DATE</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
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
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>GUEST COUNT</label>
                    <input
                      type="number"
                      placeholder="Number of guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
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

                <div style={{ borderTop: '1px solid rgba(244,239,227,0.12)', paddingTop: 24, marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.off, marginBottom: 8 }}>
                    <span>Base Price</span>
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

                {/* Instant WhatsApp Reservation Redirect Link */}
                <Link
                  href={`/venues/${id}/reserve?itemName=${encodeURIComponent(mockVenue.name)}&price=${totalPrice}&addOns=${encodeURIComponent(selectedAddOns.join(','))}&date=${encodeURIComponent(eventDate)}&guests=${encodeURIComponent(guestCount)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <BtnPrimary style={{ width: '100%', justifyContent: 'center' }}>
                    Reserve This Venue
                  </BtnPrimary>
                </Link>
                <p style={{ fontSize: 12, color: 'rgba(244,239,227,0.5)', textAlign: 'center', marginTop: 12 }}>
                  Redirects to instant WhatsApp invoice dispatch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { THEME } from '@/lib/theme';
import { BtnPrimary } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { Search, MapPin, Users, Star, Filter, Film } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockVenues = [
  {
    id: 1,
    name: 'Grand Ballroom',
    location: 'Lusaka, Zambia',
    capacity: 500,
    price: 'K65,000',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400',
    hasVideo: true,
    amenities: ['Parking', 'WiFi', 'AV Equipment', 'Catering'],
  },
  {
    id: 2,
    name: 'Garden Pavilion',
    location: 'Ndola, Zambia',
    capacity: 150,
    price: 'K20,800',
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    hasVideo: true,
    amenities: ['Parking', 'Outdoor Space', 'Tables', 'Chairs'],
  },
  {
    id: 3,
    name: 'Skyline Rooftop',
    location: 'Kitwe, Zambia',
    capacity: 200,
    price: 'K31,200',
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400',
    hasVideo: true,
    amenities: ['WiFi', 'AV Equipment', 'City Views'],
  },
  {
    id: 4,
    name: 'Historic Mansion',
    location: 'Livingstone, Zambia',
    capacity: 300,
    price: 'K46,800',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0212128?w=400',
    hasVideo: true,
    amenities: ['Parking', 'Garden', 'Historic Charm', 'Catering'],
  },
  {
    id: 5,
    name: 'Modern Conference Center',
    location: 'Lusaka, Zambia',
    capacity: 1000,
    price: 'K130,000',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
    hasVideo: true,
    amenities: ['Parking', 'WiFi', 'AV Equipment', 'Catering', 'Breakout Rooms'],
  },
  {
    id: 6,
    name: 'Beachfront Estate',
    location: 'Siavonga, Zambia',
    capacity: 250,
    price: 'K91,000',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0212128?w=400',
    hasVideo: true,
    amenities: ['Beach Access', 'Parking', 'Outdoor Space', 'Catering'],
  },
];

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    'Wedding',
    'Corporate',
    'Birthday',
    'Conference',
    'Outdoor',
    'Indoor',
    'Parking',
    'WiFi',
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      {/* Top Action Bar */}
      <div style={{ padding: '16px 40px', borderBottom: '1px solid rgba(244,239,227,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <BackButton fallbackUrl="/" label="Back to Home" />
        </div>
      </div>

      {/* Header */}
      <section style={{ padding: '40px 40px 30px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ maxWidth: 780, margin: '0 auto 36px', textAlign: 'center' }}>
          <h1 className="bf-display" style={{ fontSize: 48, fontWeight: 600, color: THEME.off, margin: '0 0 16px' }}>Find Perfect Venues</h1>
          <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 18 }}>
            Discover amazing event spaces with 360 photo and video tours
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <div
            className="stub stub-notch-l stub-notch-r bf-search-bar-2"
            style={{
              background: THEME.paper,
              borderRadius: 20,
              display: 'grid',
              alignItems: 'center',
              padding: '8px',
            }}
          >
            <div style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Search size={16} style={{ color: THEME.muted }} />
                <input
                  type="search"
                  placeholder="Search venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bf-input"
                  style={{ fontSize: 15 }}
                />
              </div>
            </div>
            <div className="dashed-v" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={16} style={{ color: THEME.muted }} />
                <input
                  type="text"
                  placeholder="Location"
                  className="bf-input"
                  style={{ fontSize: 15 }}
                />
              </div>
            </div>
            <div style={{ padding: '0 12px' }}>
              <BtnPrimary style={{ width: '100%' }}>Search</BtnPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '24px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Filter size={20} style={{ color: THEME.muted }} />
          <span style={{ color: THEME.muted, fontWeight: 500 }}>Filters:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              style={{
                background: selectedFilters.includes(filter) ? THEME.brass : 'transparent',
                color: selectedFilters.includes(filter) ? THEME.ink : THEME.off,
                border: selectedFilters.includes(filter) ? `2px solid ${THEME.brass}` : `2px solid rgba(244,239,227,0.3)`,
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '20px 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {mockVenues.map((venue) => (
            <div
              key={venue.id}
              className="bf-card stub stub-notch-t stub-notch-b"
              style={{ background: THEME.paper, borderRadius: 20, overflow: 'hidden' }}
            >
              <Link href={`/venues/${venue.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', height: 200 }}>
                  <img
                    src={venue.image}
                    alt={venue.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 4, background: THEME.ink, color: THEME.off, borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 600 }}>
                    <Star size={12} style={{ fill: THEME.brass, color: THEME.brass }} />
                    {venue.rating}
                  </div>
                  {venue.hasVideo && (
                    <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16,32,29,0.85)', color: THEME.brass, borderRadius: 8, padding: '4px 10px', fontSize: 11, fontWeight: 600, border: '1px solid rgba(192,138,62,0.4)' }}>
                      <Film size={12} /> Video Tour Available
                    </div>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.inkText, margin: '0 0 8px' }}>
                    {venue.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.muted, fontSize: 14, marginBottom: 12 }}>
                    <MapPin size={14} />
                    {venue.location}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    {venue.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} style={{
                        background: 'rgba(27,42,38,0.08)',
                        color: THEME.inkText,
                        borderRadius: 999,
                        padding: '4px 10px',
                        fontSize: 11,
                        fontWeight: 500,
                      }}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.muted, fontSize: 14 }}>
                      <Users size={14} />
                      {venue.capacity} guests
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: THEME.brass }}>
                      {venue.price}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

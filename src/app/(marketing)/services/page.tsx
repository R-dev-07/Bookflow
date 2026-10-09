'use client';

import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { Search, MapPin, Star, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockServices = [
  {
    id: 1,
    name: 'Professional Photography',
    category: 'Photography',
    location: 'Lusaka, Zambia',
    price: 'K39,000',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    serviceArea: ['Lusaka', 'Ndola', 'Kitwe'],
  },
  {
    id: 2,
    name: 'Gourmet Catering',
    category: 'Catering',
    location: 'Ndola, Zambia',
    price: 'K78,000',
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
    serviceArea: ['Ndola', 'Kitwe', 'Mufulira'],
  },
  {
    id: 3,
    name: 'Live Band',
    category: 'Entertainment',
    location: 'Kitwe, Zambia',
    price: 'K52,000',
    rating: 4.7,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    serviceArea: ['Kitwe', 'Ndola', 'Chingola'],
  },
  {
    id: 4,
    name: 'Event Planning',
    category: 'Planning',
    location: 'Livingstone, Zambia',
    price: 'K65,000',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
    serviceArea: ['Livingstone', 'Lusaka', 'Victoria Falls'],
  },
  {
    id: 5,
    name: 'Floral Design',
    category: 'Decor',
    location: 'Lusaka, Zambia',
    price: 'K31,200',
    rating: 4.6,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
    serviceArea: ['Lusaka', 'Kafue', 'Chilanga'],
  },
  {
    id: 6,
    name: 'DJ Services',
    category: 'Entertainment',
    location: 'Siavonga, Zambia',
    price: 'K20,800',
    rating: 4.8,
    reviews: 112,
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400',
    serviceArea: ['Siavonga', 'Lusaka', 'Kariba'],
  },
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    'Photography',
    'Catering',
    'Entertainment',
    'Planning',
    'Decor',
    'AV Equipment',
    'Transportation',
    'Security',
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
      <section style={{ padding: '60px 40px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ maxWidth: 780, margin: '0 auto 48px', textAlign: 'center' }}>
          <h1 className="bf-display" style={{ fontSize: 48, fontWeight: 600, color: THEME.off, margin: '0 0 16px' }}>Find Professional Services</h1>
          <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 18 }}>
            Discover talented professionals to make your event unforgettable
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
                  placeholder="Search services..."
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
                  placeholder="Service Area"
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
          <span style={{ color: THEME.muted, fontWeight: 500 }}>Categories:</span>
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
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              style={{
                background: 'transparent',
                color: THEME.muted,
                border: 'none',
                padding: '8px 16px',
                fontSize: 13,
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Clear All
            </button>
          )}
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '40px 40px 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: 'rgba(244,239,227,0.65)' }}>
            {mockServices.length} services found
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: THEME.muted, fontSize: 13 }}>Sort by:</span>
            <select style={{
              background: THEME.paper,
              border: `1px solid rgba(27,42,38,0.2)`,
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 13,
              color: THEME.inkText,
            }}>
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ background: THEME.paper, borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ height: 200, background: 'rgba(27,42,38,0.1)' }} />
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ height: 24, background: 'rgba(27,42,38,0.1)', borderRadius: 4, width: '75%' }} />
                  <div style={{ height: 16, background: 'rgba(27,42,38,0.1)', borderRadius: 4, width: '50%' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ height: 16, background: 'rgba(27,42,38,0.1)', borderRadius: 4, width: '25%' }} />
                    <div style={{ height: 16, background: 'rgba(27,42,38,0.1)', borderRadius: 4, width: '25%' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
            {mockServices.map((service, index) => (
              <div
                key={service.id}
                className="bf-card stub stub-notch-t stub-notch-b"
                style={{ background: THEME.paper, borderRadius: 20, overflow: 'hidden' }}
              >
                <Link href={`/services/${service.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', top: 14, left: 14 }}>
                      <span style={{
                        background: THEME.brass,
                        color: THEME.ink,
                        borderRadius: 999,
                        padding: '6px 12px',
                        fontSize: 11,
                        fontWeight: 600,
                      }}>
                        {service.category}
                      </span>
                    </div>
                    <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', alignItems: 'center', gap: 4, background: THEME.ink, color: THEME.off, borderRadius: 999, padding: '6px 12px', fontSize: 12, fontWeight: 600 }}>
                      <Star size={12} style={{ fill: THEME.brass, color: THEME.brass }} />
                      {service.rating}
                    </div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: THEME.inkText, margin: '0 0 8px' }}>
                      {service.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: THEME.muted, fontSize: 14, marginBottom: 12 }}>
                      <MapPin size={14} />
                      {service.location}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                      {service.serviceArea.slice(0, 2).map((area) => (
                        <span key={area} style={{
                          background: 'rgba(27,42,38,0.08)',
                          color: THEME.inkText,
                          borderRadius: 999,
                          padding: '4px 10px',
                          fontSize: 11,
                          fontWeight: 500,
                        }}>
                          {area}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 13, color: THEME.muted }}>{service.category}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: THEME.brass }}>
                        {service.price}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

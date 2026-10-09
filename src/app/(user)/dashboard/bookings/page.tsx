'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { Calendar, Search, MapPin, Clock, Plus, ArrowRight, X, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const mockBookings = [
  {
    id: '1',
    eventName: 'Wedding Reception',
    eventDate: '2024-06-15',
    status: 'PENDING',
    venue: 'Grand Ballroom',
    location: 'Lusaka, Zambia',
    service: 'Professional Photography',
    price: 25000,
    guestCount: 250,
  },
  {
    id: '2',
    eventName: 'Corporate Conference',
    eventDate: '2024-07-20',
    status: 'APPROVED',
    venue: 'Skyline Rooftop',
    location: 'Kitwe, Zambia',
    service: 'Gourmet Catering',
    price: 15000,
    guestCount: 120,
  },
  {
    id: '3',
    eventName: 'Birthday Celebration',
    eventDate: '2024-08-10',
    status: 'COMPLETED',
    venue: 'Garden Pavilion',
    location: 'Ndola, Zambia',
    service: 'Live Band',
    price: 8000,
    guestCount: 80,
  },
  {
    id: '4',
    eventName: 'Product Launch',
    eventDate: '2024-09-05',
    status: 'CANCELLED',
    venue: 'Grand Ballroom',
    location: 'Lusaka, Zambia',
    service: null,
    price: 12000,
    guestCount: 100,
  },
];

const statusStyles = {
  PENDING: { background: 'rgba(192,138,62,0.2)', color: THEME.brass, border: '1px solid rgba(192,138,62,0.3)' },
  APPROVED: { background: 'rgba(34,197,94,0.2)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' },
  COMPLETED: { background: 'rgba(244,239,227,0.2)', color: 'rgba(244,239,227,0.85)', border: '1px solid rgba(244,239,227,0.3)' },
  CANCELLED: { background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
} as const;

export default function BookingsPage() {
  const [filter, setFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [bookingsList, setBookingsList] = useState(mockBookings);

  const filteredBookings = bookingsList.filter((b) => {
    const matchesFilter = filter === 'ALL' || b.status === filter;
    const matchesSearch =
      b.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const cancelBooking = (id: string) => {
    setBookingsList(prev => prev.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b));
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <Sidebar />
      <div className="bf-dashboard-main">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
                My Bookings
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>
                Track and manage all your venue and service booking requests.
              </p>
            </div>
            <Link href="/dashboard/bookings/new" style={{ textDecoration: 'none' }}>
              <BtnPrimary>
                <Plus size={18} style={{ marginRight: 8 }} />
                New Booking
              </BtnPrimary>
            </Link>
          </div>

          {/* Filters & Search */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 12,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filter === tab ? THEME.brass : 'rgba(237,230,214,0.08)',
                    color: filter === tab ? THEME.ink : THEME.off,
                    border: '1px solid rgba(244,239,227,0.12)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab === 'ALL' ? 'All Bookings' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', minWidth: 260 }}>
              <Search style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'rgba(244,239,227,0.5)' }} />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bf-input"
                style={{
                  width: '100%',
                  paddingLeft: 40,
                  paddingRight: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: 'rgba(237,230,214,0.08)',
                  borderRadius: 12,
                  border: '1px solid rgba(244,239,227,0.12)',
                  color: THEME.off,
                  fontSize: 14,
                }}
              />
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div
              style={{
                background: 'rgba(237,230,214,0.05)',
                borderRadius: 20,
                padding: 48,
                textAlign: 'center',
                border: '1px dashed rgba(244,239,227,0.15)',
              }}
            >
              <Calendar size={48} style={{ color: 'rgba(244,239,227,0.3)', margin: '0 auto 16px' }} />
              <h3 className="bf-display" style={{ fontSize: 20, color: THEME.off, marginBottom: 8 }}>No bookings found</h3>
              <p style={{ color: 'rgba(244,239,227,0.6)', fontSize: 14, marginBottom: 24 }}>
                {searchTerm ? 'Try adjusting your search criteria.' : 'You have no bookings matching this status.'}
              </p>
              <Link href="/venues" style={{ textDecoration: 'none' }}>
                <BtnPrimary>Explore Venues</BtnPrimary>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {filteredBookings.map((booking) => {
                const statusStyle = statusStyles[booking.status as keyof typeof statusStyles];
                return (
                  <div
                    key={booking.id}
                    style={{
                      background: 'rgba(237,230,214,0.08)',
                      borderRadius: 20,
                      padding: 24,
                      border: '1px solid rgba(244,239,227,0.12)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: 24,
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <h3 className="bf-display" style={{ fontSize: 22, fontWeight: 600, color: THEME.off }}>
                          {booking.eventName}
                        </h3>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            padding: '4px 12px',
                            borderRadius: 999,
                            ...statusStyle,
                          }}
                        >
                          {booking.status}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, color: 'rgba(244,239,227,0.7)', fontSize: 14, marginBottom: 12 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Calendar size={16} style={{ color: THEME.brass }} />
                          {booking.eventDate}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <MapPin size={16} style={{ color: THEME.brass }} />
                          {booking.venue} ({booking.location})
                        </span>
                      </div>

                      {booking.service && (
                        <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)' }}>
                          Add-on Service: <strong style={{ color: THEME.off }}>{booking.service}</strong>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 12 }}>
                      <div className="bf-mono" style={{ fontSize: 22, fontWeight: 700, color: THEME.brass }}>
                        {formatCurrency(booking.price)}
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <Link href={`/dashboard/bookings/${booking.id}`} style={{ textDecoration: 'none' }}>
                          <BtnGhost variant="dark" style={{ fontSize: 13, padding: '8px 16px' }}>
                            View Details <ArrowRight size={14} style={{ marginLeft: 6 }} />
                          </BtnGhost>
                        </Link>
                        {booking.status === 'PENDING' && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            style={{
                              padding: '8px 16px',
                              borderRadius: 12,
                              background: 'rgba(239,68,68,0.15)',
                              border: '1px solid rgba(239,68,68,0.3)',
                              color: '#ef4444',
                              cursor: 'pointer',
                              fontSize: 13,
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                          >
                            <X size={14} /> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

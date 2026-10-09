'use client';

import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { Calendar, MessageSquare, Star, Clock, ArrowRight, Bell, Home, Users } from 'lucide-react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';

// Mock data - replace with actual API calls
const mockBookings = [
  {
    id: 1,
    eventName: 'Wedding Reception',
    eventDate: '2024-06-15',
    status: 'PENDING',
    venue: 'Grand Ballroom',
    service: 'Professional Photography',
    price: 25000,
  },
  {
    id: 2,
    eventName: 'Corporate Conference',
    eventDate: '2024-07-20',
    status: 'APPROVED',
    venue: 'Skyline Rooftop',
    service: null,
    price: 15000,
  },
  {
    id: 3,
    eventName: 'Birthday Party',
    eventDate: '2024-08-10',
    status: 'COMPLETED',
    venue: 'Garden Pavilion',
    service: 'Live Band',
    price: 8000,
  },
];

const mockNotifications = [
  {
    id: 1,
    type: 'BOOKING_UPDATE',
    message: 'Your booking for Wedding Reception has been approved',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'PAYMENT',
    message: 'Invoice generated for Elegant Events Venue',
    time: '1 day ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'REVIEW',
    message: 'Leave a review for your completed event',
    time: '3 days ago',
    isRead: true,
  },
];

const statusStyles = {
  PENDING: { background: 'rgba(192,138,62,0.2)', color: THEME.brass, border: '1px solid rgba(192,138,62,0.3)' },
  APPROVED: { background: 'rgba(34,197,94,0.2)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' },
  REJECTED: { background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
  CANCELLED: { background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
  COMPLETED: { background: 'rgba(244,239,227,0.2)', color: 'rgba(244,239,227,0.85)', border: '1px solid rgba(244,239,227,0.3)' },
} as const;

export default function DashboardPage() {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <Sidebar />
      <div className="bf-dashboard-main">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 40 }}>
            <h1 className="bf-display" style={{ fontSize: 40, fontWeight: 600, color: THEME.off, marginBottom: 12 }}>Welcome back!</h1>
            <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>Manage your bookings and discover new venues and services.</p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>
            <div style={{ 
              background: 'rgba(237,230,214,0.08)', 
              borderRadius: 20, 
              padding: 24,
              border: '1px solid rgba(244,239,227,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Calendar size={24} style={{ color: THEME.brass }} />
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: '#22c55e', 
                  background: 'rgba(34,197,94,0.2)', 
                  padding: '4px 12px', 
                  borderRadius: 999 
                }}>
                  +12%
                </span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>8</div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)' }}>Total Bookings</div>
            </div>

            <div style={{ 
              background: 'rgba(237,230,214,0.08)', 
              borderRadius: 20, 
              padding: 24,
              border: '1px solid rgba(244,239,227,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Clock size={24} style={{ color: THEME.brass }} />
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: THEME.brass, 
                  background: 'rgba(192,138,62,0.2)', 
                  padding: '4px 12px', 
                  borderRadius: 999 
                }}>
                  3 pending
                </span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>3</div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)' }}>Upcoming Events</div>
            </div>

            <div style={{ 
              background: 'rgba(237,230,214,0.08)', 
              borderRadius: 20, 
              padding: 24,
              border: '1px solid rgba(244,239,227,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <CreditCard size={24} style={{ color: THEME.brass }} />
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: '#22c55e',
                  background: 'rgba(34,197,94,0.2)',
                  padding: '4px 12px', 
                  borderRadius: 999 
                }}>
                  Up to date
                </span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>3</div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)' }}>Completed Payments</div>
            </div>

            <div style={{ 
              background: 'rgba(237,230,214,0.08)', 
              borderRadius: 20, 
              padding: 24,
              border: '1px solid rgba(244,239,227,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <Star size={24} style={{ color: THEME.brass }} />
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: '#22c55e', 
                  background: 'rgba(34,197,94,0.2)', 
                  padding: '4px 12px', 
                  borderRadius: 999 
                }}>
                  4.8 avg
                </span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>12</div>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.7)' }}>Reviews Given</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
            {/* Bookings */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off }}>Recent Bookings</h2>
                <Link href="/dashboard/bookings" style={{ textDecoration: 'none' }}>
                  <BtnGhost variant="dark" style={{ fontSize: 14 }}>
                    View All
                    <ArrowRight size={16} style={{ marginLeft: 8 }} />
                  </BtnGhost>
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {mockBookings.map((booking) => {
                  const statusStyle = statusStyles[booking.status as keyof typeof statusStyles];
                  return (
                    <div
                      key={booking.id}
                      style={{
                        background: 'rgba(237,230,214,0.08)',
                        borderRadius: 16,
                        padding: 20,
                        border: '1px solid rgba(244,239,227,0.12)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: THEME.off }}>{booking.eventName}</h3>
                            <span style={{ 
                              fontSize: 12, 
                              fontWeight: 600, 
                              padding: '4px 12px', 
                              borderRadius: 999,
                              ...statusStyle
                            }}>
                              {booking.status}
                            </span>
                          </div>
                          <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.65)', marginBottom: 8 }}>
                            {booking.eventDate}
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 14 }}>
                            {booking.venue && (
                              <span style={{ color: 'rgba(244,239,227,0.85)' }}>Venue: {booking.venue}</span>
                            )}
                            {booking.service && (
                              <span style={{ color: 'rgba(244,239,227,0.85)' }}>Service: {booking.service}</span>
                            )}
                          </div>
                        </div>
                        <Link href={`/dashboard/bookings/${booking.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                          <BtnGhost variant="dark" style={{ fontSize: 14, padding: '10px 16px' }}>
                            View Details
                          </BtnGhost>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off }}>Notifications</h2>
                <span style={{ 
                  fontSize: 12, 
                  fontWeight: 600, 
                  color: '#3b82f6', 
                  background: 'rgba(59,130,246,0.2)', 
                  padding: '4px 12px', 
                  borderRadius: 999 
                }}>
                  {mockNotifications.filter(n => !n.isRead).length} new
                </span>
              </div>

              <div style={{ 
                background: 'rgba(237,230,214,0.08)', 
                borderRadius: 16, 
                padding: 20,
                border: '1px solid rgba(244,239,227,0.12)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: !notification.isRead ? 'rgba(237,230,214,0.15)' : 'transparent',
                      border: !notification.isRead ? '1px solid rgba(244,239,227,0.15)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: 999, 
                        background: !notification.isRead ? THEME.brass : 'rgba(244,239,227,0.3)',
                        marginTop: 6,
                        flexShrink: 0
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, color: 'rgba(244,239,227,0.85)', lineHeight: 1.6 }}>{notification.message}</p>
                        <p style={{ fontSize: 12, color: 'rgba(244,239,227,0.5)', marginTop: 4 }}>{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: 32 }}>
                <h3 className="bf-display" style={{ fontSize: 20, fontWeight: 600, color: THEME.off, marginBottom: 16 }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link href="/venues" style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: 'rgba(237,230,214,0.08)',
                      border: '1px solid rgba(244,239,227,0.12)',
                      borderRadius: 12,
                      color: THEME.off,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: 14,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(237,230,214,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
                    }}
                    >
                      <Home size={18} />
                      Browse Venues
                    </button>
                  </Link>
                  <Link href="/services" style={{ textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: 'rgba(237,230,214,0.08)',
                      border: '1px solid rgba(244,239,227,0.12)',
                      borderRadius: 12,
                      color: THEME.off,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: 14,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(237,230,214,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
                    }}
                    >
                      <Users size={18} />
                      Browse Services
                    </button>
                  </Link>
                  <Link href="/dashboard/bookings/new" style={{ textDecoration: 'none' }}>
                    <BtnPrimary style={{ width: '100%', justifyContent: 'flex-start' }}>
                      <Calendar size={18} style={{ marginRight: 8 }} />
                      Create New Booking
                    </BtnPrimary>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

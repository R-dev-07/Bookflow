'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { Calendar, Users, Plus, X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function NewBookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('2024-07-20');
  const [guestCount, setGuestCount] = useState('150');
  const [notes, setNotes] = useState('');
  const [submittedToast, setSubmittedToast] = useState(false);

  const mockShortlist = [
    { id: '1', name: 'Grand Ballroom', type: 'VENUE', price: 65000 },
    { id: '2', name: 'Garden Pavilion', type: 'VENUE', price: 20800 },
    { id: '3', name: 'Professional Photography', type: 'SERVICE', price: 39000 },
    { id: '4', name: 'Live Band', type: 'SERVICE', price: 52000 },
  ];

  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; name: string; type: string; price: number }>>(() => {
    const itemName = searchParams.get('itemName');
    const itemPrice = Number(searchParams.get('price'));
    if (!itemName || !Number.isFinite(itemPrice)) {
      return [mockShortlist[0]!];
    }
    return [{
      id: searchParams.get('itemId') ?? itemName,
      name: itemName,
      type: searchParams.get('itemType') ?? 'VENUE',
      price: itemPrice,
    }];
  });

  const toggleItem = (item: typeof mockShortlist[0]) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
  const serviceFee = Math.round(total * 0.1);
  const finalTotal = total + serviceFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedToast(true);
    setTimeout(() => {
      router.push('/dashboard/bookings');
    }, 2000);
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <Sidebar />
      <div className="bf-dashboard-main">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <BackButton fallbackUrl="/dashboard" label="Back to Dashboard" />
            </div>
            <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
              Create New Booking Request
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>
              Assemble your shortlisted venue and services into an official booking request.
            </p>
          </div>

          {submittedToast && (
            <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '16px 20px', borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Check size={20} />
              <span>Booking request submitted! Redirecting to My Bookings...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {/* Form Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Event Details Card */}
              <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 28, border: '1px solid rgba(244,239,227,0.12)' }}>
                <h2 className="bf-display" style={{ fontSize: 22, color: THEME.off, marginBottom: 20 }}>Event Specifications</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnson Wedding Reception"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="bf-input"
                      style={{ background: 'rgba(237,230,214,0.1)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                    />
                  </div>

                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT CATEGORY</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      style={{ width: '100%', height: 48, padding: '0 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                    >
                      <option style={{ background: THEME.ink2 }}>Wedding</option>
                      <option style={{ background: THEME.ink2 }}>Corporate Event</option>
                      <option style={{ background: THEME.ink2 }}>Birthday Party</option>
                      <option style={{ background: THEME.ink2 }}>Conference</option>
                      <option style={{ background: THEME.ink2 }}>Gala / Exhibition</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EVENT DATE</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                      />
                    </div>

                    <div>
                      <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>EXPECTED GUESTS</label>
                      <input
                        type="number"
                        required
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8, letterSpacing: '0.08em' }}>SPECIAL REQUIREMENTS (OPTIONAL)</label>
                    <textarea
                      rows={3}
                      placeholder="Specify seating arrangements, catering preferences, or AV needs..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{ width: '100%', padding: '12px 16px', background: 'rgba(237,230,214,0.1)', borderRadius: 12, border: '1px solid rgba(244,239,227,0.2)', color: THEME.off, fontSize: 14, resize: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Shortlist Selection */}
              <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 28, border: '1px solid rgba(244,239,227,0.12)' }}>
                <h2 className="bf-display" style={{ fontSize: 22, color: THEME.off, marginBottom: 16 }}>Select from Shortlist</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {mockShortlist.map((item) => {
                    const isSelected = selectedItems.some(i => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item)}
                        style={{
                          padding: 16,
                          borderRadius: 12,
                          background: isSelected ? 'rgba(192,138,62,0.15)' : 'rgba(237,230,214,0.05)',
                          border: isSelected ? `2px solid ${THEME.brass}` : '1px solid rgba(244,239,227,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'rgba(244,239,227,0.1)', color: THEME.off }}>{item.type}</span>
                          <span style={{ fontSize: 15, fontWeight: 600, color: THEME.off }}>{item.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span className="bf-mono" style={{ fontSize: 15, fontWeight: 700, color: THEME.brass }}>{formatCurrency(item.price)}</span>
                          <div style={{
                            width: 22,
                            height: 22,
                            borderRadius: 999,
                            background: isSelected ? THEME.brass : 'transparent',
                            border: isSelected ? `2px solid ${THEME.brass}` : '2px solid rgba(244,239,227,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            {isSelected && <Check size={14} style={{ color: THEME.ink }} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary Column */}
            <div>
              <div
                className="stub stub-notch-t stub-notch-b"
                style={{
                  background: THEME.paper,
                  borderRadius: 20,
                  padding: 32,
                  color: THEME.inkText,
                  position: 'sticky',
                  top: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px dashed rgba(27,42,38,0.2)' }}>
                  <Sparkles size={20} style={{ color: THEME.brass }} />
                  <span className="bf-mono" style={{ fontSize: 14, fontWeight: 700 }}>BOOKING SUMMARY</span>
                </div>

                {selectedItems.length === 0 ? (
                  <p style={{ color: THEME.muted, fontSize: 14, textAlign: 'center', padding: '24px 0' }}>
                    No items selected. Pick venues or services from your shortlist.
                  </p>
                ) : (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                      {selectedItems.map((item) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                          <span style={{ fontWeight: 500, color: THEME.inkText }}>{item.name}</span>
                          <span className="bf-mono" style={{ fontWeight: 600 }}>{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px dashed rgba(27,42,38,0.2)', paddingTop: 16, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.muted }}>
                        <span>Subtotal</span>
                        <span className="bf-mono">{formatCurrency(total)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: THEME.muted }}>
                        <span>Service Fee (10%)</span>
                        <span className="bf-mono">{formatCurrency(serviceFee)}</span>
                      </div>
                      <div style={{ borderTop: '2px dashed rgba(27,42,38,0.3)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: THEME.stamp }}>
                        <span>Estimated Total</span>
                        <span className="bf-mono">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>

                    <BtnPrimary type="submit" style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}>
                      Submit Booking Request
                    </BtnPrimary>
                    <p style={{ fontSize: 12, color: THEME.muted, textAlign: 'center', marginTop: 12 }}>
                      No upfront payment required until availability is confirmed.
                    </p>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

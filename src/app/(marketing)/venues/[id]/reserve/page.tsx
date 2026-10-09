'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { BackButton } from '@/components/shared/back-button';
import { Send, Check, Phone, ArrowRight, ShieldCheck, MapPin, Calendar, Users, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const mockVenuesData: Record<string, any> = {
  '1': {
    name: 'Grand Ballroom',
    location: 'Lusaka, Zambia',
    basePrice: 65000,
    ownerPhone: '+260971234567',
    ownerName: 'BookFlow Admin & Venue Coordinator',
  },
  '2': {
    name: 'Garden Pavilion',
    location: 'Ndola, Zambia',
    basePrice: 20800,
    ownerPhone: '+260978901234',
    ownerName: 'Garden Events Mgmt',
  },
  '3': {
    name: 'Skyline Rooftop',
    location: 'Kitwe, Zambia',
    basePrice: 31200,
    ownerPhone: '+260965432109',
    ownerName: 'Skyline Luxury Hospitality',
  },
};

export default function ReserveVenuePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams?: Promise<Record<string, string>> }) {
  const { id } = use(params);
  const resolvedSearchParams = searchParams ? use(searchParams) : {};

  const venue = mockVenuesData[id] || {
    name: resolvedSearchParams.itemName || 'Grand Ballroom',
    location: 'Lusaka, Zambia',
    basePrice: Number(resolvedSearchParams.price) || 65000,
    ownerPhone: '+260971234567',
    ownerName: 'BookFlow Admin',
  };

  const date = resolvedSearchParams.date || '2024-07-20';
  const guestCount = resolvedSearchParams.guests || '150';
  const addOnsParam = resolvedSearchParams.addOns || '';
  const addOnsList = addOnsParam ? addOnsParam.split(',').filter(Boolean) : [];

  const basePrice = venue.basePrice;
  const addOnsCost = addOnsList.length * 10000;
  const serviceFee = Math.round((basePrice + addOnsCost) * 0.1);
  const totalPrice = basePrice + addOnsCost + serviceFee;

  const [recipientOption, setRecipientOption] = useState<'CUSTOM' | 'OWNER'>('OWNER');
  const [customPhone, setCustomPhone] = useState('');
  const [sentToast, setSentToast] = useState(false);

  const generateInvoiceText = () => {
    return `*BOOKFLOW VENUE RESERVATION INVOICE*\n` +
      `----------------------------------------\n` +
      `*Venue:* ${venue.name}\n` +
      `*Location:* ${venue.location}\n` +
      `*Event Date:* ${date}\n` +
      `*Guest Count:* ${guestCount}\n` +
      `----------------------------------------\n` +
      `*Base Price:* K${basePrice.toLocaleString()}\n` +
      (addOnsList.length > 0 ? `*Add-ons (${addOnsList.join(', ')}):* K${addOnsCost.toLocaleString()}\n` : '') +
      `*Service Fee:* K${serviceFee.toLocaleString()}\n` +
      `*TOTAL AMOUNT:* K${totalPrice.toLocaleString()}\n` +
      `----------------------------------------\n` +
      `Please confirm availability and booking terms.\n` +
      `Sent via BookFlow Marketplace`;
  };

  const handleSendInvoice = () => {
    const text = encodeURIComponent(generateInvoiceText());
    let targetPhone = venue.ownerPhone;

    if (recipientOption === 'CUSTOM') {
      const cleaned = customPhone.replace(/[^0-9+]/g, '');
      if (!cleaned) {
        alert('Please enter a valid WhatsApp phone number');
        return;
      }
      targetPhone = cleaned;
    }

    const cleanNumber = targetPhone.replace(/\+/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank');

    setSentToast(true);
    setTimeout(() => setSentToast(false), 5000);
  };

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Top Bar with Back Button */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <BackButton fallbackUrl={`/venues/${id}`} label="Back to Venue" />
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
            Reservation & Invoice Dispatch
          </h1>
          <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 16 }}>
            Send your booking invoice directly via WhatsApp to the venue owner or a phone number of your choice.
          </p>
        </div>

        {sentToast && (
          <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '16px 20px', borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <Check size={20} />
            <span>Invoice dispatched via WhatsApp! Opening WhatsApp window...</span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {/* Invoice Summary Card */}
          <div
            className="stub stub-notch-t stub-notch-b"
            style={{
              background: THEME.paper,
              borderRadius: 20,
              padding: 32,
              color: THEME.inkText,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottom: '1px dashed rgba(27,42,38,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FileText size={20} style={{ color: THEME.brass }} />
                <span className="bf-mono" style={{ fontSize: 14, fontWeight: 700 }}>RESERVATION INVOICE</span>
              </div>
              <span className="bf-stamp" style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>UNPAID</span>
            </div>

            <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.inkText, marginBottom: 8 }}>
              {venue.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: THEME.muted, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} /> {venue.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={16} /> Date: {date}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={16} /> Guests: {guestCount}
              </div>
            </div>

            <div style={{ borderTop: '1px dashed rgba(27,42,38,0.2)', paddingTop: 16, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Base Venue Fee</span>
                <span className="bf-mono" style={{ fontWeight: 600 }}>{formatCurrency(basePrice)}</span>
              </div>
              {addOnsList.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Add-ons ({addOnsList.join(', ')})</span>
                  <span className="bf-mono" style={{ fontWeight: 600 }}>+{formatCurrency(addOnsCost)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Service Fee (10%)</span>
                <span className="bf-mono" style={{ fontWeight: 600 }}>{formatCurrency(serviceFee)}</span>
              </div>
              <div style={{ borderTop: '2px dashed rgba(27,42,38,0.3)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: THEME.stamp }}>
                <span>TOTAL</span>
                <span className="bf-mono">{formatCurrency(totalPrice)}</span>
              </div>
            </div>

            <div style={{ background: 'rgba(27,42,38,0.06)', borderRadius: 12, padding: 12, fontSize: 12, color: THEME.muted, textAlign: 'center' }}>
              No immediate card payment needed. Invoice will be settled directly with provider or admin.
            </div>
          </div>

          {/* Dispatch Options */}
          <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 32, border: '1px solid rgba(244,239,227,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 className="bf-display" style={{ fontSize: 24, color: THEME.off, marginBottom: 16 }}>
                Choose WhatsApp Recipient
              </h2>
              <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 14, marginBottom: 24 }}>
                Select where you want to send this invoice for review and confirmation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                <label
                  onClick={() => setRecipientOption('OWNER')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: 16,
                    borderRadius: 12,
                    background: recipientOption === 'OWNER' ? 'rgba(192,138,62,0.2)' : 'rgba(237,230,214,0.05)',
                    border: recipientOption === 'OWNER' ? `2px solid ${THEME.brass}` : '1px solid rgba(244,239,227,0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="recipient"
                    checked={recipientOption === 'OWNER'}
                    onChange={() => setRecipientOption('OWNER')}
                    style={{ marginTop: 4, accentColor: THEME.brass }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: THEME.off, fontSize: 15 }}>
                      Send to Venue Admin / Owner
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)', marginTop: 2 }}>
                      Directly notify venue management ({venue.ownerPhone})
                    </div>
                  </div>
                </label>

                <label
                  onClick={() => setRecipientOption('CUSTOM')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: 16,
                    borderRadius: 12,
                    background: recipientOption === 'CUSTOM' ? 'rgba(192,138,62,0.2)' : 'rgba(237,230,214,0.05)',
                    border: recipientOption === 'CUSTOM' ? `2px solid ${THEME.brass}` : '1px solid rgba(244,239,227,0.12)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <input
                    type="radio"
                    name="recipient"
                    checked={recipientOption === 'CUSTOM'}
                    onChange={() => setRecipientOption('CUSTOM')}
                    style={{ marginTop: 4, accentColor: THEME.brass }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: THEME.off, fontSize: 15 }}>
                      Send to Custom WhatsApp Number
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)', marginTop: 2 }}>
                      Send invoice to your client, partner, or custom contact
                    </div>

                    {recipientOption === 'CUSTOM' && (
                      <div style={{ marginTop: 12 }}>
                        <input
                          type="tel"
                          placeholder="e.g. +260 97 1234567"
                          value={customPhone}
                          onChange={(e) => setCustomPhone(e.target.value)}
                          className="bf-input"
                          style={{
                            background: 'rgba(237,230,214,0.1)',
                            borderRadius: 8,
                            padding: '8px 12px',
                            border: '1px solid rgba(244,239,227,0.2)',
                            color: THEME.off,
                            fontSize: 14,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <BtnPrimary onClick={handleSendInvoice} style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}>
                <Send size={18} style={{ marginRight: 8 }} />
                Send Invoice via WhatsApp
              </BtnPrimary>

              <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <BtnGhost variant="dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Return to Dashboard
                </BtnGhost>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

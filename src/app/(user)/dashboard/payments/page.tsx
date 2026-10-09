'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { CreditCard, Download, ShieldCheck, Check, Clock, ArrowUpRight, DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const mockPayments = [
  {
    id: 'INV-2024-001',
    item: 'Grand Ballroom Venue Reservation',
    date: '2024-03-15',
    amount: 25000,
    status: 'PAID',
    method: 'Mobile Money (MTN/Airtel)',
  },
  {
    id: 'INV-2024-002',
    item: 'Corporate Conference - Skyline Rooftop',
    date: '2024-02-20',
    status: 'HELD_IN_ESCROW',
    amount: 15000,
    method: 'Visa Ending in 4242',
  },
  {
    id: 'INV-2024-003',
    item: 'Birthday Party - Garden Pavilion',
    date: '2024-01-10',
    status: 'PAID',
    amount: 8000,
    method: 'Bank Transfer',
  },
];

export default function PaymentsPage() {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadMsg(`Downloading invoice ${id}...`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  const totalSpent = mockPayments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <Sidebar />
      <div className="bf-dashboard-main">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 className="bf-display" style={{ fontSize: 36, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>
                Payments & Invoices
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>
                View your transaction history, invoices, and payment escrow status.
              </p>
            </div>
          </div>

          {/* Toast Notification */}
          {downloadMsg && (
            <div style={{ background: 'rgba(192,138,62,0.2)', border: '1px solid rgba(192,138,62,0.4)', color: THEME.brass, padding: '12px 20px', borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Download size={18} />
              <span>{downloadMsg}</span>
            </div>
          )}

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, marginBottom: 40 }}>
            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 24, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.6)', marginBottom: 8 }}>Total Spent</div>
              <div className="bf-mono" style={{ fontSize: 32, fontWeight: 700, color: THEME.brass }}>{formatCurrency(totalSpent)}</div>
            </div>

            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 24, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.6)', marginBottom: 8 }}>In Escrow Protection</div>
              <div className="bf-mono" style={{ fontSize: 32, fontWeight: 700, color: '#22c55e' }}>{formatCurrency(15000)}</div>
            </div>

            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 24, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ fontSize: 14, color: 'rgba(244,239,227,0.6)', marginBottom: 8 }}>Completed Transactions</div>
              <div className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.off }}>{mockPayments.length}</div>
            </div>
          </div>

          {/* Transactions List */}
          <div style={{ marginBottom: 40 }}>
            <h2 className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>
              Transaction History
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {mockPayments.map((p) => (
                <div
                  key={p.id}
                  style={{
                    background: 'rgba(237,230,214,0.08)',
                    borderRadius: 16,
                    padding: 24,
                    border: '1px solid rgba(244,239,227,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 16,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                      <span className="bf-mono" style={{ fontSize: 13, color: THEME.brass, fontWeight: 600 }}>{p.id}</span>
                      <span style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        fontWeight: 600,
                        background: p.status === 'PAID' ? 'rgba(34,197,94,0.2)' : 'rgba(192,138,62,0.2)',
                        color: p.status === 'PAID' ? '#22c55e' : THEME.brass,
                        border: p.status === 'PAID' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(192,138,62,0.3)',
                      }}>
                        {p.status === 'HELD_IN_ESCROW' ? 'ESCROW HELD' : 'COMPLETED'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: 16, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>{p.item}</h3>
                    <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)' }}>
                      Date: {p.date} • Method: {p.method}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className="bf-mono" style={{ fontSize: 20, fontWeight: 700, color: THEME.off }}>
                      {formatCurrency(p.amount)}
                    </div>

                    <button
                      onClick={() => handleDownload(p.id)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 12,
                        background: 'rgba(237,230,214,0.1)',
                        border: '1px solid rgba(244,239,227,0.2)',
                        color: THEME.off,
                        cursor: 'pointer',
                        fontSize: 13,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(237,230,214,0.2)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(237,230,214,0.1)'}
                    >
                      <Download size={14} /> Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Guarantee Notice */}
          <div style={{ background: 'rgba(23,48,40,0.6)', border: '1px solid rgba(192,138,62,0.3)', padding: 24, borderRadius: 20, display: 'flex', alignItems: 'center', gap: 20 }}>
            <ShieldCheck size={40} style={{ color: THEME.brass, flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: THEME.off, marginBottom: 4 }}>BookFlow Payment Protection Guarantee</h4>
              <p style={{ color: 'rgba(244,239,227,0.7)', fontSize: 14, lineHeight: 1.6 }}>
                All payments are processed securely and held safely in escrow until your event is completed. If a venue or provider fails to deliver, you are covered by our 100% money-back protection policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

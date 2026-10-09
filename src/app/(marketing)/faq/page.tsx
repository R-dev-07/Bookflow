'use client';

import { THEME } from '@/lib/theme';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const questions = [
  ['How do I reserve a listing?', 'Open a venue or service card, review the gallery and package details, then select Reserve. The booking form will already include your chosen listing.'],
  ['When do I pay?', 'A booking request does not require payment. Payment is handled after the provider confirms the request and terms.'],
  ['Can I book more than one service?', 'Yes. Add additional venues or services from the booking form before submitting your request.'],
  ['How do cancellations work?', 'Cancellation terms are set by each provider and should be reviewed on the listing before you reserve.'],
  ['What if my booking is declined?', 'If a provider declines your request, you can try another venue or service, or adjust your dates and submit a new request.'],
  ['Can I modify my booking?', 'Modifications depend on the provider and timing. Contact the provider directly or use the booking management tools in your dashboard.'],
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '100px 40px' }}>
        <div className="bf-mono" style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 12, letterSpacing: '0.08em' }}>SUPPORT</div>
        <h1 className="bf-display" style={{ fontSize: 52, fontWeight: 600, color: THEME.off, marginBottom: 20 }}>Frequently asked questions</h1>
        <p style={{ fontSize: 18, color: 'rgba(244,239,227,0.7)', marginBottom: 56, lineHeight: 1.7 }}>
          A few useful answers for planning, reserving, and managing an event on BookFlow.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {questions.map(([question, answer], index) => (
            <div
              key={question}
              style={{
                background: 'rgba(237,230,214,0.08)',
                borderRadius: 20,
                border: '1px solid rgba(244,239,227,0.12)',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: 24,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
                  <div style={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: 10, 
                    background: openIndex === index ? 'rgba(192,138,62,0.3)' : 'rgba(192,138,62,0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'background 0.2s ease',
                  }}>
                    <HelpCircle size={20} style={{ color: THEME.brass }} />
                  </div>
                  <h3 style={{ 
                    fontSize: 18, 
                    fontWeight: 600, 
                    color: THEME.off, 
                    textAlign: 'left',
                    flex: 1
                  }}>
                    {question}
                  </h3>
                </div>
                <ChevronDown 
                  size={20} 
                  style={{ 
                    color: THEME.brass, 
                    transition: 'transform 0.2s ease',
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0
                  }} 
                />
              </button>
              {openIndex === index && (
                <div style={{ 
                  padding: '0 24px 24px 80px',
                  borderTop: '1px solid rgba(244,239,227,0.08)',
                  paddingTop: 20,
                }}>
                  <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.85)', lineHeight: 1.7 }}>
                    {answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: 56,
          background: 'rgba(192,138,62,0.1)', 
          borderRadius: 20, 
          padding: 28,
          border: '1px solid rgba(192,138,62,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}>
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>Still have questions?</h3>
            <p style={{ fontSize: 15, color: 'rgba(244,239,227,0.7)', lineHeight: 1.6 }}>
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

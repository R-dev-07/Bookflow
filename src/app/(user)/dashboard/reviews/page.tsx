'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { Star, MessageSquare, Check, Plus, ThumbsUp, MapPin } from 'lucide-react';

const mockReviews = [
  {
    id: '1',
    itemName: 'Grand Ballroom',
    itemType: 'VENUE',
    location: 'Lusaka, Zambia',
    rating: 5,
    date: '2024-03-20',
    title: 'Exceeded all our expectations!',
    comment: 'The venue was breathtaking and the staff handled everything seamlessly for our wedding reception. Highly recommended!',
    providerReply: 'Thank you so much! It was an absolute pleasure hosting your special day.',
  },
  {
    id: '2',
    itemName: 'Professional Photography',
    itemType: 'SERVICE',
    location: 'Ndola, Zambia',
    rating: 5,
    date: '2024-02-14',
    title: 'Outstanding photos and service',
    comment: 'Captured all the best moments effortlessly. Very polite, punctual, and delivered photos ahead of deadline.',
    providerReply: null,
  },
  {
    id: '3',
    itemName: 'Garden Pavilion',
    itemType: 'VENUE',
    location: 'Ndola, Zambia',
    rating: 4,
    date: '2024-01-10',
    title: 'Beautiful outdoor space',
    comment: 'Slight delay with parking setup, but the garden setting made up for it completely. Gorgeous ambient lighting!',
    providerReply: null,
  },
];

const mockUnreviewedBookings = [
  { id: 'b1', name: 'Skyline Rooftop', date: '2024-04-01' },
];

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState<'REVIEWS' | 'WRITE'>('REVIEWS');
  const [selectedBooking, setSelectedBooking] = useState(mockUnreviewedBookings[0]?.id || '');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(mockReviews);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newComment) return;

    const bookingItem = mockUnreviewedBookings.find(b => b.id === selectedBooking);
    const newEntry = {
      id: String(Date.now()),
      itemName: bookingItem?.name || 'Booked Venue',
      itemType: 'VENUE',
      location: 'Lusaka, Zambia',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      comment: newComment,
      providerReply: null,
    };

    setReviewsList([newEntry, ...reviewsList]);
    setNewTitle('');
    setNewComment('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    setActiveTab('REVIEWS');
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
                Reviews & Feedback
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(244,239,227,0.7)' }}>
                Share your event experience and view feedback left for providers.
              </p>
            </div>
            <button
              onClick={() => setActiveTab(activeTab === 'REVIEWS' ? 'WRITE' : 'REVIEWS')}
              style={{ textDecoration: 'none', background: 'none', border: 'none', padding: 0 }}
            >
              <BtnPrimary>
                <Plus size={18} style={{ marginRight: 8 }} />
                {activeTab === 'REVIEWS' ? 'Write a Review' : 'View My Reviews'}
              </BtnPrimary>
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div style={{ background: 'rgba(237,230,214,0.08)', padding: 20, borderRadius: 16, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)', marginBottom: 4 }}>Total Reviews Given</div>
              <div className="bf-display" style={{ fontSize: 32, color: THEME.off, fontWeight: 600 }}>{reviewsList.length}</div>
            </div>
            <div style={{ background: 'rgba(237,230,214,0.08)', padding: 20, borderRadius: 16, border: '1px solid rgba(244,239,227,0.12)' }}>
              <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)', marginBottom: 4 }}>Average Rating Given</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="bf-display" style={{ fontSize: 32, color: THEME.brass, fontWeight: 600 }}>4.8</span>
                <div style={{ display: 'flex' }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} size={16} style={{ color: THEME.brass, fill: THEME.brass }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {successMsg && (
            <div style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid rgba(34,197,94,0.4)', color: '#22c55e', padding: '16px 20px', borderRadius: 12, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Check size={20} />
              <span>Your review has been submitted successfully! Thank you for your feedback.</span>
            </div>
          )}

          {activeTab === 'WRITE' ? (
            <div style={{ background: 'rgba(237,230,214,0.08)', borderRadius: 20, padding: 32, border: '1px solid rgba(244,239,227,0.12)', maxWidth: 700 }}>
              <h2 className="bf-display" style={{ fontSize: 24, color: THEME.off, marginBottom: 20 }}>Write a Review</h2>
              <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>SELECT COMPLETED EVENT</label>
                  <select
                    value={selectedBooking}
                    onChange={(e) => setSelectedBooking(e.target.value)}
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
                    {mockUnreviewedBookings.map(b => (
                      <option key={b.id} value={b.id} style={{ background: THEME.ink2, color: THEME.off }}>
                        {b.name} ({b.date})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>YOUR RATING</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 4,
                        }}
                      >
                        <Star
                          size={28}
                          style={{
                            color: THEME.brass,
                            fill: star <= newRating ? THEME.brass : 'transparent',
                            transition: 'all 0.15s ease',
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>REVIEW TITLE</label>
                  <input
                    type="text"
                    placeholder="e.g., Unforgettable experience!"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bf-input"
                    required
                    style={{
                      background: 'rgba(237,230,214,0.1)',
                      borderRadius: 12,
                      padding: '12px 16px',
                      border: '1px solid rgba(244,239,227,0.2)',
                      color: THEME.off,
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label className="bf-mono" style={{ display: 'block', fontSize: 12, color: THEME.off, marginBottom: 8 }}>YOUR REVIEW COMMENTS</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your experience with the venue or service..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="bf-input"
                    required
                    style={{
                      background: 'rgba(237,230,214,0.1)',
                      borderRadius: 12,
                      padding: '12px 16px',
                      border: '1px solid rgba(244,239,227,0.2)',
                      color: THEME.off,
                      fontSize: 14,
                      resize: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <BtnPrimary type="submit">Submit Review</BtnPrimary>
                  <BtnGhost type="button" variant="dark" onClick={() => setActiveTab('REVIEWS')}>Cancel</BtnGhost>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {reviewsList.map((review) => (
                <div
                  key={review.id}
                  style={{
                    background: 'rgba(237,230,214,0.08)',
                    borderRadius: 20,
                    padding: 24,
                    border: '1px solid rgba(244,239,227,0.12)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                        <h3 className="bf-display" style={{ fontSize: 20, color: THEME.off, fontWeight: 600 }}>{review.itemName}</h3>
                        <span style={{ fontSize: 11, background: 'rgba(192,138,62,0.2)', color: THEME.brass, padding: '2px 8px', borderRadius: 6, fontWeight: 600 }}>{review.itemType}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(244,239,227,0.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={14} /> {review.location} • Reviewed on {review.date}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 4 }}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={18} style={{ color: THEME.brass, fill: THEME.brass }} />
                      ))}
                    </div>
                  </div>

                  <h4 style={{ fontSize: 16, fontWeight: 600, color: THEME.off, marginBottom: 8 }}>"{review.title}"</h4>
                  <p style={{ color: 'rgba(244,239,227,0.85)', fontSize: 14, lineHeight: 1.6 }}>{review.comment}</p>

                  {review.providerReply && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(244,239,227,0.1)', background: 'rgba(237,230,214,0.04)', padding: 16, borderRadius: 12 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: THEME.brass, marginBottom: 4 }}>Response from Provider:</div>
                      <p style={{ color: 'rgba(244,239,227,0.75)', fontSize: 13 }}>{review.providerReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

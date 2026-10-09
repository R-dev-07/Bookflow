'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { Avatar } from '@/components/ui/avatar';
import { Star, Calendar, Filter, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data - replace with actual API calls
const mockReviews = [
  {
    id: 1,
    listingId: 1,
    listingName: 'Grand Ballroom',
    clientName: 'Sarah Johnson',
    clientAvatar: null,
    rating: 5,
    comment: 'Absolutely stunning venue! The staff was professional and everything was perfect for our wedding.',
    date: '2024-03-15',
    bookingId: 1,
  },
  {
    id: 2,
    listingId: 1,
    listingName: 'Grand Ballroom',
    clientName: 'Michael Chen',
    clientAvatar: null,
    rating: 5,
    comment: 'Great space for our corporate event. The AV equipment was top-notch and the location is convenient.',
    date: '2024-02-20',
    bookingId: 2,
  },
  {
    id: 3,
    listingId: 2,
    listingName: 'Garden Pavilion',
    clientName: 'Emily Davis',
    clientAvatar: null,
    rating: 4,
    comment: 'Beautiful outdoor space, perfect for our intimate ceremony. Would definitely recommend.',
    date: '2024-01-10',
    bookingId: 3,
  },
  {
    id: 4,
    listingId: 1,
    listingName: 'Grand Ballroom',
    clientName: 'Robert Wilson',
    clientAvatar: null,
    rating: 5,
    comment: 'Exceeded all expectations. The team went above and beyond to make our event special.',
    date: '2024-03-01',
    bookingId: 4,
  },
];

export default function ProviderReviewsPage() {
  const averageRating = mockReviews.length > 0
    ? mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: mockReviews.filter(r => r.rating === star).length,
    percentage: mockReviews.length > 0
      ? (mockReviews.filter(r => r.rating === star).length / mockReviews.length) * 100
      : 0,
  }));

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Reviews</h1>
          <p className="text-text-muted">Manage and respond to client reviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Overall Rating</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-accent mb-2">{averageRating.toFixed(1)}</div>
                <Rating value={averageRating} readonly size="lg" />
                <div className="text-sm text-text-muted mt-2">{mockReviews.length} reviews</div>
              </div>
            </div>

            <div className="glass-panel p-6 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-text-body">{star}</span>
                      <Star className="h-4 w-4 text-accent fill-accent" />
                    </div>
                    <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-text-muted w-8 text-right">{count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Response Rate</span>
                  <span className="text-text-primary font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">Avg Response Time</span>
                  <span className="text-text-primary font-medium">2 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-muted">This Month</span>
                  <span className="text-accent font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">All Reviews</h2>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-text-muted" />
                <select className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm text-text-body">
                  <option>All Listings</option>
                  <option>Grand Ballroom</option>
                  <option>Garden Pavilion</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {mockReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-6"
                >
                  <div className="flex items-start gap-4">
                    <Avatar
                      src={review.clientAvatar}
                      fallback={review.clientName[0]}
                      size="md"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold text-text-primary">{review.clientName}</div>
                          <div className="text-sm text-text-muted">{review.date}</div>
                        </div>
                        <Rating value={review.rating} readonly size="sm" />
                      </div>
                      <Badge variant="outline" className="mb-3">{review.listingName}</Badge>
                      <p className="text-text-body">{review.comment}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          View Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

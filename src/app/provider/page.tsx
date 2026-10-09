'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Building2, MessageSquare, Star, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockStats = {
  totalBookings: 45,
  pendingRequests: 8,
  totalRevenue: 125000,
  averageRating: 4.8,
  monthlyGrowth: 23,
};

const mockRecentBookings = [
  {
    id: 1,
    eventName: 'Wedding Reception',
    eventDate: '2024-06-15',
    status: 'PENDING',
    clientName: 'Sarah Johnson',
    quotedPrice: 4000,
  },
  {
    id: 2,
    eventName: 'Corporate Conference',
    eventDate: '2024-07-20',
    status: 'APPROVED',
    clientName: 'Michael Chen',
    quotedPrice: 2500,
  },
  {
    id: 3,
    eventName: 'Birthday Party',
    eventDate: '2024-08-10',
    status: 'COMPLETED',
    clientName: 'Emily Davis',
    quotedPrice: 1200,
  },
];

const mockListings = [
  {
    id: 1,
    name: 'Grand Ballroom',
    type: 'VENUE',
    status: 'APPROVED',
    bookings: 12,
    revenue: 48000,
  },
  {
    id: 2,
    name: 'Garden Pavilion',
    type: 'VENUE',
    status: 'APPROVED',
    bookings: 8,
    revenue: 24000,
  },
  {
    id: 3,
    name: 'Wedding Photography Package',
    type: 'SERVICE',
    status: 'PENDING_REVIEW',
    bookings: 0,
    revenue: 0,
  },
];

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
  CANCELLED: 'error',
  COMPLETED: 'default',
  PENDING_REVIEW: 'warning',
} as const;

export default function ProviderDashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Provider Dashboard</h1>
          <p className="text-text-muted">Manage your listings, bookings, and grow your business.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-5 w-5 text-accent" />
              <Badge variant="success">+{mockStats.monthlyGrowth}%</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.totalBookings}</div>
            <div className="text-sm text-text-muted">Total Bookings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-5 w-5 text-accent" />
              <Badge variant="warning">{mockStats.pendingRequests} pending</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.pendingRequests}</div>
            <div className="text-sm text-text-muted">Pending Requests</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="h-5 w-5 text-accent" />
              <Badge variant="success">+18%</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">K{mockStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-text-muted">Total Revenue</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="h-5 w-5 text-accent" />
              <Badge variant="success">4.8/5</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.averageRating}</div>
            <div className="text-sm text-text-muted">Average Rating</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Recent Bookings</h2>
              <Link href="/provider/bookings">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {mockRecentBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-text-primary">{booking.eventName}</h3>
                        <Badge variant={statusColors[booking.status as keyof typeof statusColors]}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-text-muted mb-1">
                        Client: {booking.clientName}
                      </div>
                      <div className="text-sm text-text-muted mb-1">
                        Date: {booking.eventDate}
                      </div>
                      <div className="text-sm font-medium text-accent">
                        K{booking.quotedPrice.toLocaleString()}
                      </div>
                    </div>
                    <Link href={`/provider/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Listings */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Your Listings</h2>
              <Link href="/provider/listings">
                <Button variant="ghost" size="sm">
                  Manage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {mockListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass-panel p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-text-primary">{listing.name}</h3>
                        <Badge variant="outline">{listing.type}</Badge>
                        <Badge variant={statusColors[listing.status as keyof typeof statusColors]}>
                          {listing.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-text-muted mb-1">
                        {listing.bookings} bookings
                      </div>
                      <div className="text-sm font-medium text-accent">
                        K{listing.revenue.toLocaleString()} revenue
                      </div>
                    </div>
                    <Link href={`/provider/listings/${listing.id}`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Create Listing CTA */}
            <Link href="/provider/listings/new">
              <Button variant="primary" className="w-full mt-4">
                <Building2 className="mr-2 h-4 w-4" />
                Create New Listing
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/provider/messages" className="block">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                View Messages
              </Button>
            </Link>
            <Link href="/provider/reviews" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Manage Reviews
              </Button>
            </Link>
            <Link href="/provider/bookings" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View All Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

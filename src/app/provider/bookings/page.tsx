'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, Check, X, Eye, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockBookings = [
  {
    id: 1,
    eventName: 'Wedding Reception',
    eventDate: '2024-06-15',
    status: 'PENDING',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    listingName: 'Grand Ballroom',
    quotedPrice: 4000,
    createdAt: '2024-03-01',
  },
  {
    id: 2,
    eventName: 'Corporate Conference',
    eventDate: '2024-07-20',
    status: 'APPROVED',
    clientName: 'Michael Chen',
    clientEmail: 'michael@example.com',
    listingName: 'Garden Pavilion',
    quotedPrice: 2500,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    eventName: 'Birthday Party',
    eventDate: '2024-08-10',
    status: 'COMPLETED',
    clientName: 'Emily Davis',
    clientEmail: 'emily@example.com',
    listingName: 'Grand Ballroom',
    quotedPrice: 1200,
    createdAt: '2024-01-15',
  },
  {
    id: 4,
    eventName: 'Anniversary Dinner',
    eventDate: '2024-09-05',
    status: 'PENDING',
    clientName: 'Robert Wilson',
    clientEmail: 'robert@example.com',
    listingName: 'Garden Pavilion',
    quotedPrice: 800,
    createdAt: '2024-03-10',
  },
];

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
  CANCELLED: 'error',
  COMPLETED: 'default',
} as const;

export default function ProviderBookingsPage() {
  const [filter, setFilter] = useState<string>('ALL');

  const filteredBookings = filter === 'ALL' 
    ? mockBookings 
    : mockBookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Bookings</h1>
            <p className="text-text-muted">Manage your booking requests and reservations</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">{mockBookings.length}</div>
            <div className="text-sm text-text-muted">Total Bookings</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-accent mb-1">
              {mockBookings.filter(b => b.status === 'PENDING').length}
            </div>
            <div className="text-sm text-text-muted">Pending</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {mockBookings.filter(b => b.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-text-muted">Approved</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">
              K{mockBookings.reduce((sum, b) => sum + (b.quotedPrice || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Total Revenue</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <Filter className="h-5 w-5 text-text-muted" />
          <span className="text-text-muted font-medium">Filter:</span>
          {['ALL', 'PENDING', 'APPROVED', 'COMPLETED'].map((status) => (
            <Badge
              key={status}
              variant={filter === status ? 'success' : 'outline'}
              className="cursor-pointer"
              onClick={() => setFilter(status)}
            >
              {status}
            </Badge>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-4 text-text-muted font-medium">Event</th>
                  <th className="text-left p-4 text-text-muted font-medium">Client</th>
                  <th className="text-left p-4 text-text-muted font-medium">Listing</th>
                  <th className="text-left p-4 text-text-muted font-medium">Date</th>
                  <th className="text-left p-4 text-text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-text-muted font-medium">Price</th>
                  <th className="text-left p-4 text-text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4">
                      <div className="font-medium text-text-primary">{booking.eventName}</div>
                      <div className="text-sm text-text-muted">Created {booking.createdAt}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-text-body">{booking.clientName}</div>
                      <div className="text-sm text-text-muted">{booking.clientEmail}</div>
                    </td>
                    <td className="p-4 text-text-body">{booking.listingName}</td>
                    <td className="p-4 text-text-body">{booking.eventDate}</td>
                    <td className="p-4">
                      <Badge variant={statusColors[booking.status as keyof typeof statusColors]}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-text-body">K{booking.quotedPrice?.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/provider/bookings/${booking.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        {booking.status === 'PENDING' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-accent hover:text-accent-hover">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Link href={`/provider/bookings/${booking.id}/messages`}>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

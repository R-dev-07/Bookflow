'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Edit, Eye, Archive, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockListings = [
  {
    id: 1,
    name: 'Grand Ballroom',
    type: 'VENUE',
    status: 'APPROVED',
    bookings: 12,
    revenue: 48000,
    rating: 4.9,
    reviews: 28,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Garden Pavilion',
    type: 'VENUE',
    status: 'APPROVED',
    bookings: 8,
    revenue: 24000,
    rating: 4.8,
    reviews: 16,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    name: 'Wedding Photography Package',
    type: 'SERVICE',
    status: 'PENDING_REVIEW',
    bookings: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    name: 'Catering Services',
    type: 'SERVICE',
    status: 'DRAFT',
    bookings: 0,
    revenue: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-03-15',
  },
];

const statusColors = {
  DRAFT: 'default',
  PENDING_REVIEW: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
  PAUSED: 'default',
  ARCHIVED: 'default',
} as const;

export default function ProviderListingsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">My Listings</h1>
            <p className="text-text-muted">Manage your venues and services</p>
          </div>
          <Link href="/provider/listings/new">
            <Button variant="primary">
              <Plus className="mr-2 h-4 w-4" />
              Create Listing
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">{mockListings.length}</div>
            <div className="text-sm text-text-muted">Total Listings</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-accent mb-1">
              {mockListings.filter(l => l.status === 'APPROVED').length}
            </div>
            <div className="text-sm text-text-muted">Active</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {mockListings.filter(l => l.status === 'PENDING_REVIEW').length}
            </div>
            <div className="text-sm text-text-muted">Pending Review</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">
              K{mockListings.reduce((sum, l) => sum + l.revenue, 0).toLocaleString()}
            </div>
            <div className="text-sm text-text-muted">Total Revenue</div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-4 text-text-muted font-medium">Listing</th>
                  <th className="text-left p-4 text-text-muted font-medium">Type</th>
                  <th className="text-left p-4 text-text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-text-muted font-medium">Bookings</th>
                  <th className="text-left p-4 text-text-muted font-medium">Revenue</th>
                  <th className="text-left p-4 text-text-muted font-medium">Rating</th>
                  <th className="text-left p-4 text-text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockListings.map((listing, index) => (
                  <motion.tr
                    key={listing.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-text-muted" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{listing.name}</div>
                          <div className="text-sm text-text-muted">Created {listing.createdAt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{listing.type}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusColors[listing.status as keyof typeof statusColors]}>
                        {listing.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4 text-text-body">{listing.bookings}</td>
                    <td className="p-4 text-text-body">K{listing.revenue.toLocaleString()}</td>
                    <td className="p-4">
                      {listing.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-accent fill-accent" />
                          <span className="text-text-body">{listing.rating}</span>
                          <span className="text-text-muted text-sm">({listing.reviews})</span>
                        </div>
                      ) : (
                        <span className="text-text-muted">No reviews</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/provider/listings/${listing.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/provider/listings/${listing.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Archive className="h-4 w-4" />
                        </Button>
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

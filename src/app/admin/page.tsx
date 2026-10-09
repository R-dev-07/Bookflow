'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Calendar, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock data - replace with actual API calls
const mockStats = {
  totalUsers: 15000,
  totalProviders: 2500,
  totalListings: 8000,
  totalBookings: 45000,
  pendingModeration: 23,
  reportedIssues: 5,
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'NEW_LISTING',
    description: 'New venue listing submitted for review',
    timestamp: '2 hours ago',
    status: 'PENDING',
  },
  {
    id: 2,
    type: 'USER_REPORT',
    description: 'User reported inappropriate content',
    timestamp: '4 hours ago',
    status: 'URGENT',
  },
  {
    id: 3,
    type: 'BOOKING_DISPUTE',
    description: 'Booking dispute opened',
    timestamp: '6 hours ago',
    status: 'PENDING',
  },
  {
    id: 4,
    type: 'PROVIDER_APPROVED',
    description: 'New provider account approved',
    timestamp: '1 day ago',
    status: 'COMPLETED',
  },
];

const mockPendingItems = [
  {
    id: 1,
    type: 'LISTING',
    name: 'Luxury Wedding Venue',
    submitter: 'Elegant Events',
    submittedAt: '2024-03-15',
  },
  {
    id: 2,
    type: 'PROVIDER',
    name: 'Premium Catering Co.',
    submitter: 'John Smith',
    submittedAt: '2024-03-14',
  },
  {
    id: 3,
    type: 'REVIEW',
    name: 'Suspicious review reported',
    submitter: 'System',
    submittedAt: '2024-03-13',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
          <p className="text-text-muted">Monitor platform activity and manage moderation</p>
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
              <Users className="h-5 w-5 text-accent" />
              <Badge variant="success">+12%</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-text-muted">Total Users</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Building2 className="h-5 w-5 text-accent" />
              <Badge variant="success">+8%</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.totalProviders.toLocaleString()}</div>
            <div className="text-sm text-text-muted">Providers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-5 w-5 text-accent" />
              <Badge variant="success">+15%</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.totalBookings.toLocaleString()}</div>
            <div className="text-sm text-text-muted">Total Bookings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <Badge variant="warning">{mockStats.pendingModeration}</Badge>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{mockStats.pendingModeration}</div>
            <div className="text-sm text-text-muted">Pending Review</div>
          </motion.div>
        </div>

        {/* Alerts */}
        {mockStats.reportedIssues > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 mb-8 border-l-4 border-red-500"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-semibold text-text-primary">Attention Required</h3>
            </div>
            <p className="text-text-muted mb-4">
              There are {mockStats.reportedIssues} reported issues that need immediate attention.
            </p>
            <Link href="/admin/moderation">
              <Button variant="outline" size="sm">
                View Issues
              </Button>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
              <Link href="/admin/moderation">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="glass-panel overflow-hidden">
              <div className="divide-y divide-border">
                {mockRecentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-text-primary">{activity.description}</h3>
                          <Badge
                            variant={activity.status === 'URGENT' ? 'error' : activity.status === 'PENDING' ? 'warning' : 'success'}
                            className="text-xs"
                          >
                            {activity.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-text-muted">{activity.timestamp}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Review */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-text-primary">Pending Review</h2>
              <Badge variant="warning">{mockPendingItems.length} items</Badge>
            </div>

            <div className="glass-panel overflow-hidden">
              <div className="divide-y divide-border">
                {mockPendingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-text-primary">{item.name}</h3>
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                        </div>
                        <div className="text-sm text-text-muted">
                          Submitted by {item.submitter} on {item.submittedAt}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/admin/moderation" className="block">
              <Button variant="outline" className="w-full justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Moderation Queue
              </Button>
            </Link>
            <Link href="/admin/users" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/bookings" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View Bookings
              </Button>
            </Link>
            <Link href="/admin/listings" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Building2 className="mr-2 h-4 w-4" />
                Manage Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

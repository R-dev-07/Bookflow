'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Rating } from '@/components/ui/rating';
import { MessageSquare, Star, Calendar, MapPin, Users, DollarSign, ArrowLeft, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockBooking = {
  id: 1,
  eventName: 'Wedding Reception',
  eventType: 'Wedding',
  eventDate: '2024-06-15',
  guestCount: 200,
  status: 'PENDING',
  notes: 'Looking for venue and photography services',
  createdAt: '2024-03-01',
  items: [
    {
      id: 1,
      listingId: 1,
      listingName: 'Grand Ballroom',
      listingType: 'VENUE',
      pricingTier: 'Weekend',
      quotedPrice: 4000,
      status: 'PENDING',
      rejectionReason: null,
    },
    {
      id: 2,
      listingId: 4,
      listingName: 'Professional Photography',
      listingType: 'SERVICE',
      pricingTier: 'Silver',
      quotedPrice: 2500,
      status: 'APPROVED',
      rejectionReason: null,
    },
  ],
};

const mockMessages = [
  {
    id: 1,
    senderId: 'provider',
    senderName: 'Elegant Events Venue',
    content: 'Hi! Thank you for your interest in our Grand Ballroom. We have availability on June 15th. Would you like to schedule a viewing?',
    timestamp: '2024-03-02T10:30:00',
    isOwn: false,
  },
  {
    id: 2,
    senderId: 'user',
    senderName: 'You',
    content: 'That would be great! What times are available for a viewing?',
    timestamp: '2024-03-02T11:00:00',
    isOwn: true,
  },
  {
    id: 3,
    senderId: 'provider',
    senderName: 'Elegant Events Venue',
    content: 'We have availability on Saturday, March 9th at 2 PM or Sunday, March 10th at 10 AM. Which works better for you?',
    timestamp: '2024-03-02T11:30:00',
    isOwn: false,
  },
];

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
  CANCELLED: 'error',
  COMPLETED: 'default',
} as const;

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          senderId: 'user',
          senderName: 'You',
          content: newMessage,
          timestamp: new Date().toISOString(),
          isOwn: true,
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <section className="py-4 px-4 border-b border-border">
        <div className="container mx-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <div className="glass-panel p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">{mockBooking.eventName}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusColors[mockBooking.status as keyof typeof statusColors]}>
                      {mockBooking.status}
                    </Badge>
                    <span className="text-sm text-text-muted">
                      Created on {mockBooking.createdAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-text-muted">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <div className="text-xs text-text-muted">Date</div>
                    <div className="font-medium text-text-body">{mockBooking.eventDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <Users className="h-5 w-5" />
                  <div>
                    <div className="text-xs text-text-muted">Guests</div>
                    <div className="font-medium text-text-body">{mockBooking.guestCount}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <Clock className="h-5 w-5" />
                  <div>
                    <div className="text-xs text-text-muted">Type</div>
                    <div className="font-medium text-text-body">{mockBooking.eventType}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <DollarSign className="h-5 w-5" />
                  <div>
                    <div className="text-xs text-text-muted">Total</div>
                    <div className="font-medium text-text-body">
                      K{mockBooking.items.reduce((sum, item) => sum + (item.quotedPrice || 0), 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {mockBooking.notes && (
                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-medium text-text-muted mb-2">Notes</h3>
                  <p className="text-text-body">{mockBooking.notes}</p>
                </div>
              )}
            </div>

            {/* Booking Items */}
            <div className="glass-panel p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Booking Items</h2>
              <div className="space-y-4">
                {mockBooking.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-text-primary">{item.listingName}</h3>
                          <Badge variant="outline">{item.listingType}</Badge>
                          <Badge variant={statusColors[item.status as keyof typeof statusColors]}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-text-muted mb-2">
                          Package: {item.pricingTier}
                        </div>
                        {item.quotedPrice && (
                          <div className="text-lg font-bold text-accent">
                            K{item.quotedPrice?.toLocaleString()}
                          </div>
                        )}
                        {item.rejectionReason && (
                          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-400">
                            {item.rejectionReason}
                          </div>
                        )}
                      </div>
                      <Link href={`/venues/${item.listingId}`}>
                        <Button variant="outline" size="sm">
                          View Listing
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-text-primary">Messages</h2>
                <Badge variant="info">{messages.length} messages</Badge>
              </div>

              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.isOwn
                          ? 'bg-accent text-white'
                          : 'bg-surface-2 text-text-body'
                      }`}
                    >
                      <div className="text-xs font-medium mb-1 opacity-70">
                        {message.senderName}
                      </div>
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-50 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 h-10 px-3 rounded-lg border border-border bg-surface-2 text-text-body"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Actions</h3>
              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  View All Messages
                </Button>
                <Button variant="outline" className="w-full">
                  Modify Booking
                </Button>
                <Button variant="outline" className="w-full text-red-400 hover:text-red-300">
                  Cancel Booking
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <div>
                    <div className="text-sm font-medium text-text-body">Booking Created</div>
                    <div className="text-xs text-text-muted">March 1, 2024</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                  <div>
                    <div className="text-sm font-medium text-text-body">Service Approved</div>
                    <div className="text-xs text-text-muted">March 2, 2024</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-border mt-2" />
                  <div>
                    <div className="text-sm font-medium text-text-muted">Venue Pending</div>
                    <div className="text-xs text-text-muted">Awaiting response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Review (if completed) */}
            {mockBooking.status === 'COMPLETED' && (
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Leave a Review</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Rating
                    </label>
                    <Rating value={0} onChange={() => {}} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-body mb-2">
                      Your Review
                    </label>
                    <textarea
                      placeholder="Share your experience..."
                      className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-surface-2 text-text-body resize-none"
                    />
                  </div>
                  <Button variant="primary" className="w-full">
                    Submit Review
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

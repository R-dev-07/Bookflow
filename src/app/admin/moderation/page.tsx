'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ShieldCheck, AlertTriangle, Check, X, Eye, Archive } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockPendingItems = [
  {
    id: 1,
    type: 'LISTING',
    name: 'Luxury Wedding Venue',
    submitter: 'Elegant Events',
    submitterId: 'prov_123',
    submittedAt: '2024-03-15',
    description: 'New venue listing submitted for review',
    priority: 'NORMAL',
  },
  {
    id: 2,
    type: 'PROVIDER',
    name: 'Premium Catering Co.',
    submitter: 'John Smith',
    submitterId: 'prov_124',
    submittedAt: '2024-03-14',
    description: 'New provider application',
    priority: 'NORMAL',
  },
  {
    id: 3,
    type: 'REVIEW',
    name: 'Suspicious review reported',
    submitter: 'System',
    submitterId: 'sys_001',
    submittedAt: '2024-03-13',
    description: 'Review flagged for potential fraud',
    priority: 'HIGH',
  },
];

const mockReportedIssues = [
  {
    id: 1,
    type: 'CONTENT',
    reportedBy: 'user_456',
    targetId: 'listing_789',
    targetName: 'Grand Ballroom',
    reason: 'Inappropriate content',
    description: 'Listing contains misleading information',
    reportedAt: '2024-03-15',
    status: 'PENDING',
  },
  {
    id: 2,
    type: 'USER',
    reportedBy: 'user_789',
    targetId: 'user_123',
    targetName: 'John Doe',
    reason: 'Harassment',
    description: 'User sending inappropriate messages',
    reportedAt: '2024-03-14',
    status: 'PENDING',
  },
];

const priorityColors = {
  NORMAL: 'default',
  HIGH: 'warning',
  URGENT: 'error',
} as const;

const statusColors = {
  PENDING: 'warning',
  APPROVED: 'success',
  REJECTED: 'error',
  ARCHIVED: 'default',
} as const;

export default function AdminModerationPage() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Moderation Queue</h1>
          <p className="text-text-muted">Review and moderate platform content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-accent mb-1">{mockPendingItems.length}</div>
            <div className="text-sm text-text-muted">Pending Review</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">{mockReportedIssues.length}</div>
            <div className="text-sm text-text-muted">Reported Issues</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">156</div>
            <div className="text-sm text-text-muted">Reviewed Today</div>
          </div>
          <div className="glass-panel p-6">
            <div className="text-2xl font-bold text-text-primary mb-1">98%</div>
            <div className="text-sm text-text-muted">Accuracy Rate</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending Review ({mockPendingItems.length})</TabsTrigger>
            <TabsTrigger value="reported">Reported Issues ({mockReportedIssues.length})</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="glass-panel overflow-hidden">
              <div className="divide-y divide-border">
                {mockPendingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-text-primary">{item.name}</h3>
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant={priorityColors[item.priority as keyof typeof priorityColors]}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-text-muted mb-2">{item.description}</p>
                        <div className="text-sm text-text-muted">
                          Submitted by {item.submitter} on {item.submittedAt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent-hover">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reported">
            <div className="glass-panel overflow-hidden">
              <div className="divide-y divide-border">
                {mockReportedIssues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <h3 className="font-semibold text-text-primary">{issue.targetName}</h3>
                          <Badge variant="outline">{issue.type}</Badge>
                          <Badge variant={statusColors[issue.status as keyof typeof statusColors]}>
                            {issue.status}
                          </Badge>
                        </div>
                        <div className="text-text-muted mb-2">
                          <span className="font-medium">Reason:</span> {issue.reason}
                        </div>
                        <p className="text-text-muted mb-2">{issue.description}</p>
                        <div className="text-sm text-text-muted">
                          Reported by {issue.reportedBy} on {issue.reportedAt}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent-hover">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="glass-panel p-12 text-center">
              <ShieldCheck className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Moderation History</h3>
              <p className="text-text-muted">View all previously moderated items</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

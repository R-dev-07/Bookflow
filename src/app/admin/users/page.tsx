'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Search, Filter, MoreVertical, Shield, UserCheck, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Mock data - replace with actual API calls
const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-01-15',
    bookings: 3,
    avatar: null,
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'PROVIDER',
    status: 'ACTIVE',
    createdAt: '2024-02-20',
    bookings: 12,
    avatar: null,
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'USER',
    status: 'ACTIVE',
    createdAt: '2024-03-10',
    bookings: 1,
    avatar: null,
  },
  {
    id: 4,
    name: 'Robert Wilson',
    email: 'robert@example.com',
    role: 'USER',
    status: 'SUSPENDED',
    createdAt: '2024-01-05',
    bookings: 5,
    avatar: null,
  },
];

const roleColors = {
  USER: 'default',
  PROVIDER: 'success',
  ADMIN: 'info',
} as const;

const statusColors = {
  ACTIVE: 'success',
  SUSPENDED: 'error',
  PENDING: 'warning',
} as const;

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Users</h1>
          <p className="text-text-muted">Manage user accounts and permissions</p>
        </div>

        {/* Filters */}
        <div className="glass-panel p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
              <input
                type="search"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 rounded-lg border border-border bg-surface-2 text-text-body"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-text-muted" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-surface-2 text-text-body"
              >
                <option value="ALL">All Roles</option>
                <option value="USER">User</option>
                <option value="PROVIDER">Provider</option>
                <option value="ADMIN">Admin</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 rounded-lg border border-border bg-surface-2 text-text-body"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="SUSPENDED">Suspended</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass-panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left p-4 text-text-muted font-medium">User</th>
                  <th className="text-left p-4 text-text-muted font-medium">Role</th>
                  <th className="text-left p-4 text-text-muted font-medium">Status</th>
                  <th className="text-left p-4 text-text-muted font-medium">Bookings</th>
                  <th className="text-left p-4 text-text-muted font-medium">Joined</th>
                  <th className="text-left p-4 text-text-muted font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={user.avatar}
                          fallback={user.name[0]}
                          size="md"
                        />
                        <div>
                          <div className="font-medium text-text-primary">{user.name}</div>
                          <div className="text-sm text-text-muted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={roleColors[user.role as keyof typeof roleColors]}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={statusColors[user.status as keyof typeof statusColors]}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-text-body">{user.bookings}</td>
                    <td className="p-4 text-text-muted">{user.createdAt}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                        {user.status === 'ACTIVE' ? (
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-accent hover:text-accent-hover">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
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

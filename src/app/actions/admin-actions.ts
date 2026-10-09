'use server';

import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Helper function to check if user is admin
async function requireAdmin() {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user || user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}

// Approve a listing
export async function approveListing(listingId: number) {
  await requireAdmin();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: { status: 'APPROVED' },
  });

  revalidatePath('/admin/moderation');
  revalidatePath('/admin/listings');
  return updatedListing;
}

// Reject a listing
export async function rejectListing(listingId: number, reason?: string) {
  await requireAdmin();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data: {
      status: 'REJECTED',
      rejectionReason: reason,
    },
  });

  revalidatePath('/admin/moderation');
  revalidatePath('/admin/listings');
  return updatedListing;
}

// Approve a provider
export async function approveProvider(providerId: number) {
  await requireAdmin();

  const provider = await prisma.provider.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const updatedProvider = await prisma.provider.update({
    where: { id: providerId },
    data: { status: 'APPROVED' },
  });

  // Update user role to PROVIDER
  await prisma.user.update({
    where: { id: provider.userId },
    data: { role: 'PROVIDER' },
  });

  revalidatePath('/admin/moderation');
  revalidatePath('/admin/users');
  return updatedProvider;
}

// Reject a provider
export async function rejectProvider(providerId: number, reason?: string) {
  await requireAdmin();

  const provider = await prisma.provider.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const updatedProvider = await prisma.provider.update({
    where: { id: providerId },
    data: {
      status: 'REJECTED',
      rejectionReason: reason,
    },
  });

  revalidatePath('/admin/moderation');
  revalidatePath('/admin/users');
  return updatedProvider;
}

// Suspend a user
export async function suspendUser(userId: number, reason?: string) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role === 'ADMIN') {
    throw new Error('Cannot suspend admin users');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      status: 'SUSPENDED',
      suspensionReason: reason,
    },
  });

  revalidatePath('/admin/users');
  return updatedUser;
}

// Unsuspend a user
export async function unsuspendUser(userId: number) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      status: 'ACTIVE',
      suspensionReason: null,
    },
  });

  revalidatePath('/admin/users');
  return updatedUser;
}

// Delete a review
export async function deleteReview(reviewId: number, reason?: string) {
  await requireAdmin();

  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error('Review not found');
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  revalidatePath('/admin/moderation');
  revalidatePath('/admin/reviews');
  return { success: true };
}

// Resolve a reported issue
export async function resolveReport(reportId: number, action: 'APPROVED' | 'REJECTED' | 'ARCHIVED', notes?: string) {
  await requireAdmin();

  const report = await prisma.report.findUnique({
    where: { id: reportId },
  });

  if (!report) {
    throw new Error('Report not found');
  }

  const updatedReport = await prisma.report.update({
    where: { id: reportId },
    data: {
      status: 'RESOLVED',
      resolutionAction: action,
      resolutionNotes: notes,
      resolvedAt: new Date(),
    },
  });

  revalidatePath('/admin/moderation');
  return updatedReport;
}

// Promote user to admin
export async function promoteToAdmin(userId: number) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role === 'ADMIN') {
    throw new Error('User is already an admin');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: 'ADMIN' },
  });

  revalidatePath('/admin/users');
  return updatedUser;
}

// Demote admin to user
export async function demoteFromAdmin(userId: number) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.role !== 'ADMIN') {
    throw new Error('User is not an admin');
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: 'USER' },
  });

  revalidatePath('/admin/users');
  return updatedUser;
}

// Delete a listing (admin override)
export async function adminDeleteListing(listingId: number, reason?: string) {
  await requireAdmin();

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  await prisma.listing.delete({
    where: { id: listingId },
  });

  revalidatePath('/admin/listings');
  revalidatePath('/admin/moderation');
  return { success: true };
}

// Get moderation stats
export async function getModerationStats() {
  await requireAdmin();

  const [
    pendingListings,
    pendingProviders,
    pendingReports,
    flaggedReviews,
    totalUsers,
    suspendedUsers,
  ] = await Promise.all([
    prisma.listing.count({ where: { status: 'PENDING_REVIEW' } }),
    prisma.provider.count({ where: { status: 'PENDING' } }),
    prisma.report.count({ where: { status: 'PENDING' } }),
    prisma.review.count({ where: { isFlagged: true } }),
    prisma.user.count(),
    prisma.user.count({ where: { status: 'SUSPENDED' } }),
  ]);

  return {
    pendingListings,
    pendingProviders,
    pendingReports,
    flaggedReviews,
    totalUsers,
    suspendedUsers,
  };
}

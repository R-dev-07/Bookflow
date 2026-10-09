'use server';

import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Approve a booking request
export async function approveBooking(bookingItemId: number, quotedPrice?: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const bookingItem = await prisma.bookingItem.findUnique({
    where: { id: bookingItemId },
    include: {
      listing: true,
      booking: true,
    },
  });

  if (!bookingItem) {
    throw new Error('Booking item not found');
  }

  if (bookingItem.listing.providerId !== provider.id) {
    throw new Error('Unauthorized');
  }

  const updatedItem = await prisma.bookingItem.update({
    where: { id: bookingItemId },
    data: {
      status: 'APPROVED',
      quotedPrice: quotedPrice,
    },
  });

  revalidatePath('/provider/bookings');
  return updatedItem;
}

// Reject a booking request
export async function rejectBooking(bookingItemId: number, rejectionReason?: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const bookingItem = await prisma.bookingItem.findUnique({
    where: { id: bookingItemId },
    include: {
      listing: true,
    },
  });

  if (!bookingItem) {
    throw new Error('Booking item not found');
  }

  if (bookingItem.listing.providerId !== provider.id) {
    throw new Error('Unauthorized');
  }

  const updatedItem = await prisma.bookingItem.update({
    where: { id: bookingItemId },
    data: {
      status: 'REJECTED',
      rejectionReason,
    },
  });

  revalidatePath('/provider/bookings');
  return updatedItem;
}

// Send a message to a client
export async function sendMessageToClient(data: {
  bookingId: number;
  content: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: {
      bookingItems: {
        include: {
          listing: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  const hasAccess = booking.bookingItems.some(
    item => item.listing.providerId === provider.id
  );

  if (!hasAccess) {
    throw new Error('Unauthorized');
  }

  const message = await prisma.message.create({
    data: {
      bookingId: data.bookingId,
      senderId: provider.id,
      receiverId: booking.userId,
      content: data.content,
      isRead: false,
    },
  });

  revalidatePath(`/provider/bookings/${data.bookingId}`);
  revalidatePath('/provider/messages');
  return message;
}

// Create a new listing
export async function createListing(data: {
  type: 'VENUE' | 'SERVICE';
  name: string;
  description: string;
  category?: string;
  location?: string;
  capacity?: number;
  pricingTiers: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  addOns?: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
  images?: string[];
  amenities?: string[];
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const listing = await prisma.listing.create({
    data: {
      providerId: provider.id,
      type: data.type,
      name: data.name,
      description: data.description,
      category: data.category,
      location: data.location,
      capacity: data.capacity,
      status: 'PENDING_REVIEW',
      pricingTiers: {
        create: data.pricingTiers,
      },
      addOns: data.addOns ? {
        create: data.addOns,
      } : undefined,
      images: data.images ? {
        create: data.images.map(url => ({ url })),
      } : undefined,
      amenities: data.amenities ? {
        create: data.amenities.map(name => ({ name })),
      } : undefined,
    },
  });

  revalidatePath('/provider/listings');
  return listing;
}

// Update a listing
export async function updateListing(
  listingId: number,
  data: {
    name?: string;
    description?: string;
    category?: string;
    location?: string;
    capacity?: number;
    status?: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PAUSED' | 'ARCHIVED';
  }
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  if (listing.providerId !== provider.id) {
    throw new Error('Unauthorized');
  }

  const updatedListing = await prisma.listing.update({
    where: { id: listingId },
    data,
  });

  revalidatePath('/provider/listings');
  revalidatePath(`/provider/listings/${listingId}`);
  return updatedListing;
}

// Delete a listing
export async function deleteListing(listingId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });

  if (!listing) {
    throw new Error('Listing not found');
  }

  if (listing.providerId !== provider.id) {
    throw new Error('Unauthorized');
  }

  await prisma.listing.delete({
    where: { id: listingId },
  });

  revalidatePath('/provider/listings');
  return { success: true };
}

// Reply to a review
export async function replyToReview(data: {
  reviewId: number;
  reply: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const review = await prisma.review.findUnique({
    where: { id: data.reviewId },
    include: {
      listing: true,
    },
  });

  if (!review) {
    throw new Error('Review not found');
  }

  if (review.listing.providerId !== provider.id) {
    throw new Error('Unauthorized');
  }

  const updatedReview = await prisma.review.update({
    where: { id: data.reviewId },
    data: {
      providerReply: data.reply,
      providerReplyDate: new Date(),
    },
  });

  revalidatePath('/provider/reviews');
  return updatedReview;
}

// Mark booking as completed
export async function completeBooking(bookingId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const provider = await prisma.provider.findUnique({
    where: { clerkId: userId },
  });

  if (!provider) {
    throw new Error('Provider not found');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      bookingItems: {
        include: {
          listing: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  const hasAccess = booking.bookingItems.some(
    item => item.listing.providerId === provider.id
  );

  if (!hasAccess) {
    throw new Error('Unauthorized');
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'COMPLETED',
      bookingItems: {
        updateMany: {
          where: {
            listing: { providerId: provider.id },
          },
          data: { status: 'COMPLETED' },
        },
      },
    },
  });

  revalidatePath('/provider/bookings');
  return updatedBooking;
}

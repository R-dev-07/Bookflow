'use server';

import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Create a new booking
export async function createBooking(data: {
  eventName: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  notes?: string;
  listingItems: Array<{
    listingId: number;
    pricingTier: string;
  }>;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      eventName: data.eventName,
      eventType: data.eventType,
      eventDate: new Date(data.eventDate),
      guestCount: data.guestCount,
      notes: data.notes,
      status: 'PENDING',
      bookingItems: {
        create: data.listingItems.map(item => ({
          listingId: item.listingId,
          pricingTier: item.pricingTier,
          status: 'PENDING',
        })),
      },
    },
    include: {
      bookingItems: true,
    },
  });

  revalidatePath('/dashboard');
  return booking;
}

// Add item to shortlist
export async function addToShortlist(listingId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const existing = await prisma.shortlist.findUnique({
    where: {
      userId_listingId: {
        userId: user.id,
        listingId,
      },
    },
  });

  if (existing) {
    return existing;
  }

  const shortlist = await prisma.shortlist.create({
    data: {
      userId: user.id,
      listingId,
    },
  });

  revalidatePath('/dashboard');
  return shortlist;
}

// Remove item from shortlist
export async function removeFromShortlist(listingId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.shortlist.delete({
    where: {
      userId_listingId: {
        userId: user.id,
        listingId,
      },
    },
  });

  revalidatePath('/dashboard');
  return { success: true };
}

// Send a message
export async function sendMessage(data: {
  bookingId: number;
  content: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
    include: {
      bookingItems: {
        include: {
          listing: {
            include: {
              provider: true,
            },
          },
        },
      },
    },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  const providerId = booking.bookingItems[0]?.listing.providerId;
  if (!providerId) {
    throw new Error('Provider not found');
  }

  const message = await prisma.message.create({
    data: {
      bookingId: data.bookingId,
      senderId: user.id,
      receiverId: providerId,
      content: data.content,
      isRead: false,
    },
  });

  revalidatePath(`/dashboard/bookings/${data.bookingId}`);
  return message;
}

// Create a review
export async function createReview(data: {
  bookingId: number;
  listingId: number;
  rating: number;
  comment: string;
}) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  if (booking.status !== 'COMPLETED') {
    throw new Error('Booking must be completed to leave a review');
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId_listingId: {
        bookingId: data.bookingId,
        listingId: data.listingId,
      },
    },
  });

  if (existingReview) {
    throw new Error('Review already exists for this booking');
  }

  const review = await prisma.review.create({
    data: {
      bookingId: data.bookingId,
      listingId: data.listingId,
      userId: user.id,
      rating: data.rating,
      comment: data.comment,
    },
  });

  revalidatePath(`/dashboard/bookings/${data.bookingId}`);
  return review;
}

// Cancel a booking
export async function cancelBooking(bookingId: number) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.userId !== user.id) {
    throw new Error('Unauthorized');
  }

  if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
    throw new Error('Cannot cancel this booking');
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      status: 'CANCELLED',
      bookingItems: {
        updateMany: {
          where: { bookingId },
          data: { status: 'CANCELLED' },
        },
      },
    },
  });

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/bookings/${bookingId}`);
  return updatedBooking;
}

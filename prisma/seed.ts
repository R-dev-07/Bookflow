import { PrismaClient, UserRole, ListingType, ListingStatus, BookingStatus, BookingItemStatus, ReviewType, NotificationType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean existing data
  await prisma.notification.deleteMany();
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.bookingItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.listingRevision.deleteMany();
  await prisma.availabilityBlock.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.pricingTier.deleteMany();
  await prisma.serviceDetails.deleteMany();
  await prisma.venueDetails.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.providerProfile.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: 'user_1',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        role: UserRole.USER,
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'provider_1',
        email: 'provider@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        role: UserRole.PROVIDER,
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'provider_2',
        email: 'provider2@example.com',
        firstName: 'Mike',
        lastName: 'Johnson',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        role: UserRole.PROVIDER,
      },
    }),
    prisma.user.create({
      data: {
        clerkId: 'admin_1',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        role: UserRole.ADMIN,
      },
    }),
  ]);

  console.log('Created users');

  // Create provider profiles
  const providerProfiles = await Promise.all([
    prisma.providerProfile.create({
      data: {
        userId: users[1].id,
        businessName: 'Elegant Events Venue',
        description: 'Premium event venue for weddings, corporate events, and special occasions.',
        logoUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=Elegant',
        websiteUrl: 'https://elegantevents.com',
        phoneNumber: '+1-555-0101',
        isVerified: true,
      },
    }),
    prisma.providerProfile.create({
      data: {
        userId: users[2].id,
        businessName: 'Professional Photography Services',
        description: 'Award-winning photography for events and special occasions.',
        logoUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=Photo',
        websiteUrl: 'https://prophoto.com',
        phoneNumber: '+1-555-0102',
        isVerified: true,
      },
    }),
  ]);

  console.log('Created provider profiles');

  // Create venue listings
  const venue1 = await prisma.listing.create({
    data: {
      providerId: providerProfiles[0].id,
      type: ListingType.VENUE,
      title: 'Grand Ballroom',
      slug: 'grand-ballroom',
      description: 'A stunning ballroom with crystal chandeliers, perfect for weddings and galas.',
      location: '123 Event Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      status: ListingStatus.APPROVED,
      publishedAt: new Date(),
      venueDetails: {
        create: {
          capacity: 500,
          squareFootage: 10000,
          hasParking: true,
          hasWifi: true,
          hasAV: true,
          hasCatering: true,
          hasTables: true,
          hasChairs: true,
          amenities: ['Chandeliers', 'Stage', 'Dance Floor', 'VIP Lounge'],
          photos: [
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
          ],
          setupTime: 120,
          cleanupTime: 90,
        },
      },
      pricingTiers: {
        create: [
          {
            name: 'Weekday',
            description: 'Monday through Thursday pricing',
            price: 2500,
            isDefault: true,
          },
          {
            name: 'Weekend',
            description: 'Friday through Sunday pricing',
            price: 4000,
          },
        ],
      },
      addOns: {
        create: [
          {
            name: 'Premium Linens',
            description: 'High-quality table linens and chair covers',
            price: 500,
          },
          {
            name: 'Additional Lighting',
            description: 'Extra ambient lighting packages',
            price: 300,
          },
        ],
      },
    },
  });

  const venue2 = await prisma.listing.create({
    data: {
      providerId: providerProfiles[0].id,
      type: ListingType.VENUE,
      title: 'Garden Pavilion',
      slug: 'garden-pavilion',
      description: 'Beautiful outdoor pavilion surrounded by gardens, ideal for intimate ceremonies.',
      location: '456 Garden Lane',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA',
      status: ListingStatus.APPROVED,
      publishedAt: new Date(),
      venueDetails: {
        create: {
          capacity: 150,
          squareFootage: 3000,
          hasParking: true,
          hasWifi: false,
          hasAV: true,
          hasCatering: false,
          hasTables: true,
          hasChairs: true,
          amenities: ['Garden Views', 'Pergola', 'Outdoor Lighting'],
          photos: [
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
          ],
          setupTime: 60,
          cleanupTime: 60,
        },
      },
      pricingTiers: {
        create: [
          {
            name: 'Standard',
            description: 'Standard pavilion rental',
            price: 800,
            isDefault: true,
          },
        ],
      },
    },
  });

  // Create service listings
  const service1 = await prisma.listing.create({
    data: {
      providerId: providerProfiles[1].id,
      type: ListingType.SERVICE,
      title: 'Wedding Photography Package',
      slug: 'wedding-photography-package',
      description: 'Full-day wedding photography with edited digital gallery.',
      location: 'Greater New York Area',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      status: ListingStatus.APPROVED,
      publishedAt: new Date(),
      serviceDetails: {
        create: {
          category: 'Photography',
          serviceArea: ['New York', 'New Jersey', 'Connecticut'],
          travelRadius: 100,
          portfolio: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
          ],
          minimumLeadTime: 14,
        },
      },
      pricingTiers: {
        create: [
          {
            name: 'Bronze',
            description: '4 hours coverage',
            price: 1500,
            duration: 240,
          },
          {
            name: 'Silver',
            description: '8 hours coverage',
            price: 2500,
            duration: 480,
            isDefault: true,
          },
          {
            name: 'Gold',
            description: 'Full day coverage + album',
            price: 4000,
            duration: 720,
          },
        ],
      },
      addOns: {
        create: [
          {
            name: 'Second Shooter',
            description: 'Additional photographer',
            price: 800,
          },
          {
            name: 'Drone Coverage',
            description: 'Aerial photography and video',
            price: 500,
          },
        ],
      },
    },
  });

  console.log('Created listings');

  // Create a booking
  const booking = await prisma.booking.create({
    data: {
      userId: users[0].id,
      eventType: 'Wedding',
      eventDate: new Date('2025-06-15'),
      guestCount: 200,
      notes: 'Looking for venue and photography services',
      status: BookingStatus.PENDING,
      items: {
        create: [
          {
            listingId: venue1.id,
            pricingTierId: (await prisma.pricingTier.findFirst({ where: { listingId: venue1.id, name: 'Weekend' } }))!.id,
            addOns: [(await prisma.addOn.findFirst({ where: { listingId: venue1.id, name: 'Premium Linens' } }))!.id],
            status: BookingItemStatus.PENDING,
          },
          {
            listingId: service1.id,
            pricingTierId: (await prisma.pricingTier.findFirst({ where: { listingId: service1.id, name: 'Silver' } }))!.id,
            status: BookingItemStatus.PENDING,
          },
        ],
      },
    },
  });

  console.log('Created booking');

  // Create messages
  const bookingItem = await prisma.bookingItem.findFirst({
    where: { bookingId: booking.id },
  });

  if (bookingItem) {
    await prisma.message.create({
      data: {
        bookingItemId: bookingItem.id,
        senderId: users[0].id,
        receiverId: users[1].id,
        content: 'Hi, I\'m interested in booking your venue for my wedding. What dates are available?',
        isRead: false,
      },
    });

    await prisma.message.create({
      data: {
        bookingItemId: bookingItem.id,
        senderId: users[1].id,
        receiverId: users[0].id,
        content: 'Hello! Congratulations on your upcoming wedding. We have several dates available in June. Would you like to schedule a viewing?',
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  console.log('Created messages');

  // Create reviews
  await prisma.review.create({
    data: {
      listingId: venue1.id,
      reviewerId: users[0].id,
      revieweeId: users[1].id,
      type: ReviewType.USER_TO_PROVIDER,
      rating: 5,
      comment: 'Absolutely stunning venue! The staff was professional and everything was perfect.',
    },
  });

  console.log('Created reviews');

  // Create notifications
  await prisma.notification.create({
    data: {
      userId: users[1].id,
      type: NotificationType.BOOKING_REQUEST,
      title: 'New Booking Request',
      message: 'You have a new booking request for Grand Ballroom',
      link: `/provider/bookings/${booking.id}`,
    },
  });

  await prisma.notification.create({
    data: {
      userId: users[0].id,
      type: NotificationType.MESSAGE,
      title: 'New Message',
      message: 'You have a new message regarding your booking request',
      link: `/bookings/${booking.id}`,
    },
  });

  console.log('Created notifications');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { businessName, description, logoUrl, websiteUrl, phoneNumber } = body;

    if (!businessName) {
      return new Response('Business name is required', { status: 400 });
    }

    // Check if user already has a provider profile
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: session.userId },
      include: { providerProfile: true },
    });

    if (!existingUser) {
      return new Response('User not found', { status: 404 });
    }

    if (existingUser.providerProfile) {
      return new Response('Provider profile already exists', { status: 400 });
    }

    // Create provider profile
    const providerProfile = await prisma.providerProfile.create({
      data: {
        userId: existingUser.id,
        businessName,
        description,
        logoUrl,
        websiteUrl,
        phoneNumber,
      },
    });

    // Update user role in database
    await prisma.user.update({
      where: { id: existingUser.id },
      data: { role: UserRole.PROVIDER },
    });

    // Update user role in Clerk metadata
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(session.userId, {
      publicMetadata: {
        role: 'PROVIDER',
      },
    });

    return new Response(JSON.stringify(providerProfile), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating provider profile:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

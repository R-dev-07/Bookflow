import { headers } from 'next/headers';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

type EventType = 'user.created' | 'user.updated' | 'user.deleted';

interface UserEvent {
  id: string;
  email_addresses: Array<{
    email_address: string;
    verification_status: string;
  }>;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

interface WebhookEvent {
  data: UserEvent;
  object: 'event';
  type: EventType;
}

export async function POST(req: Request) {
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    } as WebhookRequiredHeaders) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    const email = email_addresses.find(
      (email) => email.verification_status === 'verified'
    )?.email_address;

    if (!email) {
      return new Response('Error occurred -- no verified email', {
        status: 400,
      });
    }

    await prisma.user.create({
      data: {
        clerkId: id,
        email,
        firstName: first_name || null,
        lastName: last_name || null,
        imageUrl: image_url || null,
        role: UserRole.USER,
      },
    });
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    const email = email_addresses.find(
      (email) => email.verification_status === 'verified'
    )?.email_address;

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email: email || undefined,
        firstName: first_name || undefined,
        lastName: last_name || undefined,
        imageUrl: image_url || undefined,
      },
    });
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  return new Response('', { status: 200 });
}

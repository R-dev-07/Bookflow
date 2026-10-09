import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';
import { UserRole } from '@prisma/client';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkId: session.userId },
  });

  return user;
}

export async function checkRole(role: UserRole) {
  const session = await auth();
  if (!session?.userId) return false;

  const user = await prisma.user.findUnique({
    where: { clerkId: session.userId },
    select: { role: true },
  });

  return user?.role === role;
}

export async function requireRole(role: UserRole) {
  const hasRole = await checkRole(role);
  if (!hasRole) {
    throw new Error(`Unauthorized: ${role} role required`);
  }
}

export async function isProvider() {
  return checkRole(UserRole.PROVIDER);
}

export async function isAdmin() {
  return checkRole(UserRole.ADMIN);
}

export async function requireProvider() {
  return requireRole(UserRole.PROVIDER);
}

export async function requireAdmin() {
  return requireRole(UserRole.ADMIN);
}

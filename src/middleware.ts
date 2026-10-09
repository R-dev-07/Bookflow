import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/venues',
  '/venues/(.*)',
  '/services',
  '/services/(.*)',
  '/help',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
  '/cookies',
  '/api/webhooks(.*)',
  '/api/become-provider',
]);

const isProviderRoute = createRouteMatcher([
  '/provider(.*)',
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect all other routes - require authentication
  if (!userId) {
    const url = req.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  // Protect provider routes
  if (isProviderRoute(req)) {
    const session = await auth();
    const role = session?.publicMetadata?.role as string;
    
    if (role !== 'PROVIDER' && role !== 'ADMIN') {
      const url = req.nextUrl.clone();
      url.pathname = '/become-a-provider';
      return NextResponse.redirect(url);
    }
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    const session = await auth();
    const role = session?.publicMetadata?.role as string;
    
    if (role !== 'ADMIN') {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

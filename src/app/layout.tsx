import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/shared/back-to-top';
import "./globals.css";

export const metadata: Metadata = {
  title: "BookFlow - Event & Venue Booking Marketplace",
  description: "Find and book perfect venues and services for your events. The premier marketplace for event planning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full antialiased">
        <body className="min-h-full flex flex-col bg-bg-app">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </body>
      </html>
    </ClerkProvider>
  );
}

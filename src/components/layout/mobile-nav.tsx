'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Building2, Briefcase, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/venues', label: 'Venues', icon: Building2 },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/dashboard', label: 'Dashboard', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full bg-accent text-white shadow-lg"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation */}
      <nav
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-surface-1/95 backdrop-blur-lg transition-transform duration-300',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="text-lg font-semibold text-text-primary">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-text-muted hover:text-text-primary"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-accent/10 text-accent'
                      : 'text-text-muted hover:text-text-primary hover:bg-surface-subtle'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="p-4 border-t border-border">
            <Link
              href="/sign-in"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 text-center rounded-lg bg-surface-2 text-text-body hover:bg-border transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

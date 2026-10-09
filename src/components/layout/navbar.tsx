'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, UserButton } from '@clerk/nextjs';
import { THEME } from '@/lib/theme';
import { BtnPrimary, BtnGhost } from '@/components/shared/buttons';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { isSignedIn, user } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide top Navbar completely on dashboard, provider, and admin routes where sidebar is present
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/provider') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 40, width: '100%', borderBottom: '1px solid rgba(244,239,227,0.12)', background: 'rgba(16,32,29,0.95)', backdropFilter: 'blur(10px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 12, background: THEME.brass }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: THEME.ink }}>B</span>
            </div>
            <span className="bf-display" style={{ fontSize: 24, fontWeight: 600, color: THEME.off }}>BookFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: 32 }}>
            <Link href="/venues" style={{ color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 15, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}>
              Venues
            </Link>
            <Link href="/services" style={{ color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 15, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}>
              Services
            </Link>
            <Link href="/become-a-provider" style={{ color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 15, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}>
              Become a Provider
            </Link>
          </div>

          {/* Search Bar */}
          <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ position: 'relative', width: 320 }}>
              <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(244,239,227,0.5)' }} />
              <input
                type="search"
                placeholder="Search venues or services..."
                className="bf-input"
                style={{
                  width: '100%',
                  paddingLeft: 48,
                  paddingRight: 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  background: 'rgba(237,230,214,0.1)',
                  borderRadius: 12,
                  fontSize: 14,
                  color: THEME.off,
                }}
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: 16 }}>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                  <BtnGhost variant="dark">Dashboard</BtnGhost>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link href="/sign-in" style={{ textDecoration: 'none' }}>
                  <BtnGhost variant="dark">Sign In</BtnGhost>
                </Link>
                <Link href="/sign-up" style={{ textDecoration: 'none' }}>
                  <BtnPrimary>Sign Up</BtnPrimary>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ display: 'md', padding: 12, color: 'rgba(244,239,227,0.7)', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isMobileMenuOpen ? <X style={{ width: 28, height: 28 }} /> : <Menu style={{ width: 28, height: 28 }} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{ display: 'md', flexDirection: 'column', gap: 24, padding: '24px 0', borderTop: '1px solid rgba(244,239,227,0.12)' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: 'rgba(244,239,227,0.5)' }} />
              <input
                type="search"
                placeholder="Search venues or services..."
                className="bf-input"
                style={{
                  width: '100%',
                  paddingLeft: 48,
                  paddingRight: 16,
                  paddingTop: 12,
                  paddingBottom: 12,
                  background: 'rgba(237,230,214,0.1)',
                  borderRadius: 12,
                  fontSize: 14,
                  color: THEME.off,
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Link 
                href="/venues" 
                style={{ padding: '12px 0', color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 16, transition: 'color 0.15s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Venues
              </Link>
              <Link 
                href="/services" 
                style={{ padding: '12px 0', color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 16, transition: 'color 0.15s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/become-a-provider" 
                style={{ padding: '12px 0', color: 'rgba(244,239,227,0.7)', textDecoration: 'none', fontSize: 16, transition: 'color 0.15s ease' }} 
                onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} 
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.7)'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Become a Provider
              </Link>
            </div>
            {isSignedIn ? (
              <>
                <Link href="/dashboard" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                  <BtnGhost variant="dark" style={{ width: '100%' }}>Dashboard</BtnGhost>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 999, background: THEME.brass, display: 'flex', alignItems: 'center', justifyContent: 'center', color: THEME.ink, fontWeight: 600 }}>
                      {user?.firstName?.[0] || 'U'}
                    </div>
                    <span style={{ fontSize: 16, color: THEME.off }}>{user?.firstName}</span>
                  </div>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link href="/sign-in" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                  <BtnGhost variant="dark" style={{ width: '100%' }}>Sign In</BtnGhost>
                </Link>
                <Link href="/sign-up" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
                  <BtnPrimary style={{ width: '100%' }}>Sign Up</BtnPrimary>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

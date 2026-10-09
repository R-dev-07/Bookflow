'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, useClerk, UserButton } from '@clerk/nextjs';
import { THEME } from '@/lib/theme';
import { 
  LayoutDashboard, 
  Calendar, 
  Star,
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  CreditCard,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/dashboard/bookings', icon: Calendar },
  { name: 'Reviews', href: '/dashboard/reviews', icon: Star },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const { isSignedIn, user } = useAuth();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!isSignedIn) return null;

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open Navigation Menu"
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 60,
          width: 50,
          height: 50,
          borderRadius: 999,
          background: THEME.brass,
          color: THEME.ink,
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        className="lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`bf-sidebar ${isMobileOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: isCollapsed ? 80 : 280,
          background: 'rgba(16,32,29,0.98)',
          borderRight: '1px solid rgba(244,239,227,0.12)',
          backdropFilter: 'blur(10px)',
          transition: 'width 0.3s ease, transform 0.3s ease',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div style={{ padding: isCollapsed ? 20 : 32, borderBottom: '1px solid rgba(244,239,227,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" onClick={() => setIsMobileOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: 40, 
              height: 40, 
              borderRadius: 10, 
              background: THEME.brass,
              flexShrink: 0
            }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: THEME.ink }}>B</span>
            </div>
            {!isCollapsed && (
              <span className="bf-display" style={{ fontSize: 20, fontWeight: 600, color: THEME.off }}>BookFlow</span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', color: THEME.off, cursor: 'pointer', padding: 4 }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: isCollapsed ? 20 : 24, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: isCollapsed ? 12 : '12px 16px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    background: isActive ? 'rgba(192,138,62,0.2)' : 'transparent',
                    color: isActive ? THEME.brass : 'rgba(244,239,227,0.7)',
                    transition: 'all 0.2s ease',
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
                      e.currentTarget.style.color = THEME.off;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'rgba(244,239,227,0.7)';
                    }
                  }}
                  >
                  <Icon size={20} style={{ flexShrink: 0 }} />
                  {!isCollapsed && (
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Browse Section */}
          {!isCollapsed && (
            <div style={{ marginTop: 32 }}>
              <div className="bf-mono" style={{ 
                fontSize: 11, 
                fontWeight: 600, 
                color: 'rgba(244,239,227,0.5)', 
                marginBottom: 12, 
                letterSpacing: '0.08em',
                paddingLeft: 4
              }}>
                BROWSE
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Link
                  href="/venues"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'rgba(244,239,227,0.7)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
                    e.currentTarget.style.color = THEME.off;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(244,239,227,0.7)';
                  }}
                  >
                  <Home size={20} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Venues</span>
                </Link>
                <Link
                  href="/services"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: 'rgba(244,239,227,0.7)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
                    e.currentTarget.style.color = THEME.off;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'rgba(244,239,227,0.7)';
                  }}
                  >
                  <Users size={20} style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Services</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* User & Sign Out Section */}
        <div style={{ 
          padding: isCollapsed ? 20 : 24, 
          borderTop: '1px solid rgba(244,239,227,0.12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          {!isCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ 
                width: 40, 
                height: 40, 
                borderRadius: 999, 
                background: THEME.brass, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: THEME.ink, 
                fontWeight: 600,
                flexShrink: 0
              }}>
                {user?.firstName?.[0] || 'U'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 600, 
                  color: THEME.off,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: 'rgba(244,239,227,0.5)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {user?.emailAddresses?.[0]?.emailAddress}
                </div>
              </div>
            </div>
          )}

          {/* Sign Out Button */}
          <button
            onClick={() => signOut({ redirectUrl: '/' })}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: 12,
              padding: isCollapsed ? 12 : '12px 16px',
              borderRadius: 12,
              background: 'rgba(166,58,46,0.15)',
              border: '1px solid rgba(166,58,46,0.3)',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(166,58,46,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(166,58,46,0.15)';
            }}
          >
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {!isCollapsed && <span>Sign Out</span>}
          </button>

          {/* Collapse Toggle Button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: 10,
                background: 'rgba(237,230,214,0.08)',
                border: '1px solid rgba(244,239,227,0.12)',
                borderRadius: 10,
                color: THEME.off,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(237,230,214,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
              }}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
            {!isCollapsed && (
              <UserButton afterSignOutUrl="/" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

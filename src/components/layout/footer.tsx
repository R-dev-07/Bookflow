'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { THEME } from '@/lib/theme';

export function Footer() {
  const pathname = usePathname();

  // Hide footer on dashboard, provider, and admin routes
  if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/provider') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer style={{ borderTop: '1px solid rgba(244,239,227,0.12)', background: THEME.ink2 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 40px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 12, background: THEME.brass }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: THEME.ink }}>B</span>
              </div>
              <span className="bf-display" style={{ fontSize: 22, fontWeight: 600, color: THEME.off }}>BookFlow</span>
            </div>
            <p style={{ color: 'rgba(244,239,227,0.65)', fontSize: 14, lineHeight: 1.6 }}>
              The premier marketplace for event venues and services. Find, book, and manage your perfect event experience.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(244,239,227,0.65)', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(244,239,227,0.65)', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(244,239,227,0.65)', transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.off} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                <svg style={{ width: 20, height: 20 }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h3 className="bf-mono" style={{ fontSize: 13, fontWeight: 600, color: THEME.off, marginBottom: 20, letterSpacing: '0.08em' }}>EXPLORE</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link href="/venues" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Venues
                </Link>
              </li>
              <li>
                <Link href="/services" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/become-a-provider" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="bf-mono" style={{ fontSize: 13, fontWeight: 600, color: THEME.off, marginBottom: 20, letterSpacing: '0.08em' }}>SUPPORT</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link href="/help" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="bf-mono" style={{ fontSize: 13, fontWeight: 600, color: THEME.off, marginBottom: 20, letterSpacing: '0.08em' }}>LEGAL</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <Link href="/privacy" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" style={{ color: 'rgba(244,239,227,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.15s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = THEME.brass} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(244,239,227,0.65)'}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(244,239,227,0.12)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <p style={{ color: 'rgba(244,239,227,0.5)', fontSize: 13 }}>
              © {new Date().getFullYear()} BookFlow. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(244,239,227,0.5)', fontSize: 13 }}>
                <svg style={{ width: 16, height: 16, color: THEME.brass }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure Payments</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(244,239,227,0.5)', fontSize: 13 }}>
                <svg style={{ width: 16, height: 16, color: THEME.brass }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Verified Providers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

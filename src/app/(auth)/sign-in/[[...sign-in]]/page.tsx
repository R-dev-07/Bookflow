'use client';

import { SignIn } from '@clerk/nextjs';
import { THEME } from '@/lib/theme';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  return (
    <div
      className="stub stub-notch-t stub-notch-b"
      style={{
        background: THEME.paper,
        borderRadius: 20,
        padding: '48px 40px',
      }}
    >
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: THEME.muted, textDecoration: 'none', marginBottom: 24 }}>
        <ArrowLeft size={16} />
        <span style={{ fontSize: 14 }}>Back to home</span>
      </Link>
      
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 className="bf-display" style={{ fontSize: 32, fontWeight: 600, color: THEME.inkText, margin: '0 0 12px' }}>Welcome Back</h1>
      </div>
      
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-transparent shadow-none border-0 p-0",
            formButtonPrimary: {
              backgroundColor: THEME.brass,
              color: THEME.ink,
              fontWeight: 600,
            },
            formFieldInput: {
              backgroundColor: 'transparent',
              borderColor: 'rgba(27,42,38,0.2)',
              color: THEME.inkText,
            },
            headerTitle: {
              color: THEME.inkText,
              fontWeight: 600,
            },
            headerSubtitle: {
              color: THEME.muted,
            },
            socialButtonsBlockButton: {
              borderColor: 'rgba(27,42,38,0.2)',
              color: THEME.inkText,
            },
            dividerLine: {
              borderColor: 'rgba(27,42,38,0.15)',
            },
            dividerText: {
              color: THEME.muted,
            },
            footerActionLink: {
              color: THEME.brass,
            },
            formFieldLabel: {
              color: THEME.inkText,
              fontWeight: 500,
            },
          },
        }}
      />
    </div>
  );
}

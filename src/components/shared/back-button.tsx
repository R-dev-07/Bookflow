'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { THEME } from '@/lib/theme';

interface BackButtonProps {
  fallbackUrl?: string;
  label?: string;
  className?: string;
}

export function BackButton({ fallbackUrl, label = 'Back', className }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    } else {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 12,
        background: 'rgba(237,230,214,0.08)',
        border: '1px solid rgba(244,239,227,0.12)',
        color: THEME.off,
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(237,230,214,0.15)';
        e.currentTarget.style.color = THEME.brass;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(237,230,214,0.08)';
        e.currentTarget.style.color = THEME.off;
      }}
    >
      <ArrowLeft size={16} />
      <span>{label}</span>
    </button>
  );
}

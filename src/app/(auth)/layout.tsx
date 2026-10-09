'use client';

import { THEME } from '@/lib/theme';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bf-root" style={{ background: THEME.ink, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
      <div style={{ width: '100%', maxWidth: 480 }}>{children}</div>
    </div>
  );
}

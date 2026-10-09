'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProviderMessagesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/provider');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#10201D] flex items-center justify-center p-8 text-[#F4EFE3]">
      <p>Redirecting to Provider Dashboard...</p>
    </div>
  );
}

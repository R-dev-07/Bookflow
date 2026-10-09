import { ProviderSidebar } from '@/components/layout/provider-sidebar';

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ProviderSidebar />
      <main className="flex-1 lg:pl-64">
        {children}
      </main>
    </div>
  );
}

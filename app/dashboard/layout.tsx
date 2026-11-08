import TopNav from '@/app/ui/dashboard/topnav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <div className="mx-auto w-full max-w-7xl grow px-4 py-8 md:px-8 md:py-10">
        {children}
      </div>
    </div>
  );
}

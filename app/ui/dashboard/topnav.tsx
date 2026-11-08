import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { signOut } from '@/auth';

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-night-600 bg-night-900">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-stretch gap-1 px-3 md:gap-6 md:px-8">
        <Link
          href="/"
          aria-label="Acme home"
          className="flex items-center pr-2 md:border-r md:border-night-600 md:pr-6"
        >
          <AcmeLogo size="sm" />
        </Link>

        <nav aria-label="Main" className="flex flex-1 items-stretch gap-1">
          <NavLinks />
        </nav>

        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
          className="flex items-stretch"
        >
          <button
            aria-label="Sign out"
            className="flex items-center justify-center gap-2 border-b-2 border-transparent px-3 text-sm font-medium text-night-300 transition-colors hover:bg-night-800 hover:text-ice-200 md:px-4"
          >
            <PowerIcon className="w-5" />
            <span className="hidden md:block">Sign out</span>
          </button>
        </form>
      </div>
    </header>
  );
}

import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <FaceFrownIcon className="w-12 text-ice-400" />
      <h1 className="text-2xl font-semibold">404: Page not found</h1>
      <p className="text-night-300">
        The page you are looking for doesn&apos;t exist or was moved.
      </p>
      <Link
        href="/dashboard"
        className="mt-4 border border-ice-400 bg-ice-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-night-950 transition-colors hover:border-ice-300 hover:bg-ice-300"
      >
        Go to dashboard
      </Link>
    </main>
  );
}

import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 py-20">
      <FaceFrownIcon className="w-10 text-ice-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p className="text-night-300">Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 border border-ice-400 bg-ice-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-night-950 transition-colors hover:border-ice-300 hover:bg-ice-300"
      >
        Go back to invoices
      </Link>
    </main>
  );
}

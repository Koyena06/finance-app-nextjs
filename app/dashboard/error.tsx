'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="max-w-md text-night-300">
        We couldn&apos;t load this page. Check your database connection and try
        again.
      </p>
      <button
        className="mt-2 border border-ice-400 bg-ice-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-night-950 transition-colors hover:border-ice-300 hover:bg-ice-300"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}

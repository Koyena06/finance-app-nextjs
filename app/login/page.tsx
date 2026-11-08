import type { Metadata } from 'next';
import Link from 'next/link';
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Log in' };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      {/* Brand panel: sits on top on mobile, on the left on desktop */}
      <section className="flex flex-col justify-between gap-12 border-b border-night-600 bg-night-900 p-6 md:border-b-0 md:border-r md:p-12">
        <Link href="/" aria-label="Back to the Acme home page">
          <AcmeLogo />
        </Link>
        <div className="hidden md:block">
          <div className="mb-6 h-0 w-0 border-b-[26px] border-l-[15px] border-r-[15px] border-b-ice-400 border-l-transparent border-r-transparent" />
          <p
            className={`${lusitana.className} max-w-sm text-3xl leading-snug text-ice-100`}
          >
            Invoices, customers and revenue. All in one place.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

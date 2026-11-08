import type { Metadata } from 'next';
import Link from 'next/link';
import AcmeLogo from '@/app/ui/acme-logo';
import SignupForm from '@/app/ui/signup-form';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = { title: 'Sign up' };

export default function SignupPage() {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <section className="flex flex-col justify-between gap-12 border-b border-night-600 bg-night-900 p-6 md:border-b-0 md:border-r md:p-12">
        <Link href="/" aria-label="Back to the Acme home page">
          <AcmeLogo />
        </Link>
        <div className="hidden md:block">
          <div className="mb-6 h-0 w-0 border-b-[26px] border-l-[15px] border-r-[15px] border-b-ice-400 border-l-transparent border-r-transparent" />
          <p
            className={`${lusitana.className} max-w-sm text-3xl leading-snug text-ice-100`}
          >
            Create an account to manage invoices and customers.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">
          <SignupForm />
        </div>
      </section>
    </main>
  );
}

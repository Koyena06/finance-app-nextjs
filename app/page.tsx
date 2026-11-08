//exports React component and its required for the route to be accessible
import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end border border-night-600 bg-night-900 p-4 md:h-52">
        <AcmeLogo />
      </div>
      {/* Reversed on desktop: screenshot on the left, copy on the right */}
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row-reverse">
        <div className="flex flex-col justify-center gap-6 border border-night-600 bg-night-800 px-6 py-10 md:w-2/5 md:px-14">
          <div className="relative h-0 w-0 border-b-[26px] border-l-[15px] border-r-[15px] border-b-ice-400 border-l-transparent border-r-transparent" />
          <p
            className={`${lusitana.className} text-xl text-night-100 md:text-3xl md:leading-normal`}
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a
              href="https://nextjs.org/learn/"
              className="text-ice-400 underline decoration-ice-400/40 underline-offset-4 hover:text-ice-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start border border-ice-400 bg-ice-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-night-950 transition-colors hover:border-ice-300 hover:bg-ice-300 md:text-sm"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/signup"
              className="border border-night-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-night-200 transition-colors hover:border-ice-400 hover:text-ice-300 md:text-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center border border-night-600 bg-night-900 p-6 md:w-3/5 md:px-16 md:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000} //to understand aspect ratio and not the actual size
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}

'use client';

import { startTransition, useActionState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from './button';
import { authenticate } from '@/app/lib/actions';

const inputClass =
  'peer block w-full border border-night-600 bg-night-900 py-[9px] pl-10 text-sm text-night-100 placeholder:text-night-400 focus:border-ice-400 focus:ring-1 focus:ring-ice-400';

export default function LoginForm() {
  const searchParams = useSearchParams();
  // After signing in, go back to the page that sent the person here.
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const passwordRef = useRef<HTMLInputElement>(null);

  // After a failed attempt keep the email, but clear the password.
  useEffect(() => {
    if (!isPending && errorMessage && passwordRef.current) {
      passwordRef.current.value = '';
      passwordRef.current.focus();
    }
  }, [isPending, errorMessage]);

  return (
    // Submitting via onSubmit (not <form action>) stops React 19 from
    // resetting every field after a failed login.
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="space-y-3"
    >
      <div className="flex-1 border border-night-600 bg-night-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-night-300"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={inputClass}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-night-400 peer-focus:text-ice-400" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-night-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={inputClass}
                id="password"
                ref={passwordRef}
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-night-400 peer-focus:text-ice-400" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          type="submit"
          className="mt-6 w-full"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending ? 'Logging in…' : 'Log in'}
          <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage ? (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-300" />
              <p className="text-sm text-red-300">{errorMessage}</p>
            </>
          ) : null}
        </div>
        <p className="mt-2 text-center text-sm text-night-300">
          New here?{' '}
          <Link
            href="/signup"
            className="text-ice-400 underline decoration-ice-400/40 underline-offset-4 hover:text-ice-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}

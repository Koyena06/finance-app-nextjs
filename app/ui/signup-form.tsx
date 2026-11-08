'use client';

import { startTransition, useActionState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { register, type SignupState } from '@/app/lib/actions';

const inputClass =
  'peer block w-full border border-night-600 bg-night-900 py-[9px] pl-10 text-sm text-night-100 placeholder:text-night-400 focus:border-ice-400 focus:ring-1 focus:ring-ice-400';
const labelClass =
  'mb-3 mt-5 block text-xs font-medium uppercase tracking-[0.12em] text-night-300';
const iconClass =
  'pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-night-400 peer-focus:text-ice-400';

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((e) => (
        <p key={e} className="mt-2 flex items-center gap-1 text-sm text-red-300">
          <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
          {e}
        </p>
      ))}
    </div>
  );
}

export default function SignupForm() {
  const initial: SignupState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(register, initial);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  // Keep name/email after an error, but clear the passwords.
  useEffect(() => {
    if (!isPending && (state.errors || state.message)) {
      if (passwordRef.current) passwordRef.current.value = '';
      if (confirmRef.current) confirmRef.current.value = '';
    }
  }, [isPending, state]);

  return (
    <form
      // onSubmit (not <form action>) stops React 19 wiping every field on error.
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="space-y-3"
    >
      <div className="flex-1 border border-night-600 bg-night-800 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-1 text-2xl`}>
          Create your account.
        </h1>

        <label className={labelClass} htmlFor="name">
          Name
        </label>
        <div className="relative">
          <input
            className={inputClass}
            id="name"
            name="name"
            placeholder="Enter your name"
            autoComplete="name"
            required
            aria-describedby="name-error"
          />
          <UserIcon className={iconClass} />
        </div>
        <FieldErrors id="name-error" errors={state.errors?.name} />

        <label className={labelClass} htmlFor="email">
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
            aria-describedby="email-error"
          />
          <AtSymbolIcon className={iconClass} />
        </div>
        <FieldErrors id="email-error" errors={state.errors?.email} />

        <label className={labelClass} htmlFor="password">
          Password
        </label>
        <div className="relative">
          <input
            className={inputClass}
            id="password"
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
            minLength={8}
            aria-describedby="password-error"
          />
          <KeyIcon className={iconClass} />
        </div>
        <FieldErrors id="password-error" errors={state.errors?.password} />

        <label className={labelClass} htmlFor="confirmPassword">
          Confirm password
        </label>
        <div className="relative">
          <input
            className={inputClass}
            id="confirmPassword"
            ref={confirmRef}
            type="password"
            name="confirmPassword"
            placeholder="Repeat your password"
            autoComplete="new-password"
            required
            minLength={8}
            aria-describedby="confirm-error"
          />
          <KeyIcon className={iconClass} />
        </div>
        <FieldErrors
          id="confirm-error"
          errors={state.errors?.confirmPassword}
        />

        <Button
          type="submit"
          className="mt-6 w-full"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending ? 'Creating account…' : 'Sign up'}
          <ArrowRightIcon className="ml-auto h-5 w-5" />
        </Button>

        <div aria-live="polite" aria-atomic="true" className="min-h-8 pt-2">
          {state.message ? (
            <p className="flex items-center gap-1 text-sm text-red-300">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
              {state.message}
            </p>
          ) : null}
        </div>

        <p className="mt-2 text-center text-sm text-night-300">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-ice-400 underline decoration-ice-400/40 underline-offset-4 hover:text-ice-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}

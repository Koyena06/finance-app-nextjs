'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import type { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import type { State } from '@/app/lib/actions';

const fieldClass =
  'peer block w-full border border-night-600 bg-night-800 py-2 pl-10 text-sm text-night-100 placeholder:text-night-400 focus:border-ice-400 focus:ring-1 focus:ring-ice-400';
const labelClass =
  'mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-night-300';
const optionBase =
  'flex cursor-pointer items-center justify-center gap-2 px-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-2 peer-focus-visible:outline-ice-300';

function FieldErrors({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error) => (
        <p className="mt-2 flex items-center gap-1 text-sm text-red-300" key={error}>
          <ExclamationCircleIcon className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ))}
    </div>
  );
}

// Shared by the "create" and "edit" pages.
export default function InvoiceFormFields({
  customers,
  invoice,
  state,
  isPending,
  submitLabel,
  onSubmit,
}: {
  customers: CustomerField[];
  invoice?: InvoiceForm;
  state: State;
  isPending: boolean;
  submitLabel: string;
  onSubmit: (formData: FormData) => void;
}) {
  return (
    <form
      // Submitting through onSubmit (instead of <form action>) keeps what the
      // person typed if the server rejects it; React would otherwise reset
      // the form after every action.
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(new FormData(event.currentTarget));
      }}
      aria-describedby="form-error"
    >
      <div className="border border-night-600 border-l-2 border-l-ice-400 bg-night-800 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-6">
          <label htmlFor="customer" className={labelClass}>
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className={`${fieldClass} cursor-pointer`}
              defaultValue={invoice?.customer_id ?? ''}
              required
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-night-400 peer-focus:text-ice-400" />
          </div>
          <FieldErrors id="customer-error" errors={state.errors?.customerId} />
        </div>

        {/* Amount */}
        <div className="mb-6">
          <label htmlFor="amount" className={labelClass}>
            Choose an amount
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              defaultValue={invoice?.amount}
              placeholder="Enter USD amount"
              className={fieldClass}
              aria-describedby="amount-error"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-night-400 peer-focus:text-ice-400" />
          </div>
          <FieldErrors id="amount-error" errors={state.errors?.amount} />
        </div>

        {/* Status */}
        <fieldset aria-describedby="status-error">
          <legend className={labelClass}>Set the invoice status</legend>
          <div className="grid grid-cols-2 gap-px border border-night-600 bg-night-600">
            <div className="relative bg-night-900">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                defaultChecked={invoice?.status === 'pending'}
                required
                className="peer sr-only"
              />
              <label
                htmlFor="pending"
                className={`${optionBase} h-full text-night-300 hover:bg-night-700 peer-checked:bg-night-600 peer-checked:text-ice-100`}
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="relative bg-night-900">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                defaultChecked={invoice?.status === 'paid'}
                className="peer sr-only"
              />
              <label
                htmlFor="paid"
                className={`${optionBase} h-full text-night-300 hover:bg-night-700 peer-checked:bg-ice-400 peer-checked:text-night-950`}
              >
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
          <FieldErrors id="status-error" errors={state.errors?.status} />
        </fieldset>

        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-6 flex items-center gap-1 border border-red-300/40 bg-red-300/10 px-3 py-2 text-sm text-red-200">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
              {state.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center border border-night-500 px-5 text-xs font-semibold uppercase tracking-[0.12em] text-night-200 transition-colors hover:border-ice-400 hover:text-ice-300"
        >
          Cancel
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  );
}

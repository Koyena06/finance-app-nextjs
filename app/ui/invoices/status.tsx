import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]',
        {
          'border border-night-500 text-night-200': status === 'pending',
          'border border-ice-400 bg-ice-400 text-night-950': status === 'paid',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4" />
        </>
      ) : null}
      {status === 'paid' ? (
        <>
          Paid
          <CheckIcon className="ml-1 w-4" />
        </>
      ) : null}
    </span>
  );
}

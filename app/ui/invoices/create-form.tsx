'use client';

import { startTransition, useActionState } from 'react';
import type { CustomerField } from '@/app/lib/definitions';
import { createInvoice, type State } from '@/app/lib/actions';
import InvoiceFormFields from '@/app/ui/invoices/invoice-form';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(
    createInvoice,
    initialState,
  );

  return (
    <InvoiceFormFields
      customers={customers}
      state={state}
      isPending={isPending}
      submitLabel="Create Invoice"
      onSubmit={(formData) => startTransition(() => formAction(formData))}
    />
  );
}

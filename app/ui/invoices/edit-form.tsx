'use client';

import { startTransition, useActionState } from 'react';
import type { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import { updateInvoice, type State } from '@/app/lib/actions';
import InvoiceFormFields from '@/app/ui/invoices/invoice-form';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, formAction, isPending] = useActionState(
    updateInvoiceWithId,
    initialState,
  );

  return (
    <InvoiceFormFields
      customers={customers}
      invoice={invoice}
      state={state}
      isPending={isPending}
      submitLabel="Save Changes"
      onSubmit={(formData) => startTransition(() => formAction(formData))}
    />
  );
}

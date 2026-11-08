'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { auth, signIn } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  customerId: z
    .string({ invalid_type_error: 'Please select a customer.' })
    .uuid('Please select a customer.'),
  amount: z.coerce
    .number({ invalid_type_error: 'Please enter a valid amount.' })
    .gt(0, { message: 'Please enter an amount greater than $0.' })
    .lte(21_000_000, { message: 'That amount is too large.' }),
  status: z.enum(['pending', 'paid'], {
    errorMap: () => ({ message: 'Please select an invoice status.' }),
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// Server actions are public endpoints, so check the session here too.
async function requireUser() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('You must be signed in to do that.');
  }
}

export async function createInvoice(prevState: State, formData: FormData) {
  await requireUser();

  const validated = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Some fields are missing or invalid. Failed to create invoice.',
    };
  }

  const { customerId, amount, status } = validated.data;
  // Math.round avoids float errors such as 19.99 * 100 = 1998.9999999999998
  const amountInCents = Math.round(amount * 100);
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error: failed to create invoice.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  await requireUser();

  const validated = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Some fields are missing or invalid. Failed to update invoice.',
    };
  }

  const { customerId, amount, status } = validated.data;
  const amountInCents = Math.round(amount * 100);

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return { message: 'Database error: failed to update invoice.' };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await requireUser();

  await sql`DELETE FROM invoices WHERE id = ${id}`;

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          console.error('Auth error:', error);
          return 'Something went wrong. Please try again.';
      }
    }
    // Successful sign-in redirects by throwing, so re-throw anything else.
    throw error;
  }
}

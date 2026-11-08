'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
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

export type SignupState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

const SignupSchema = z
  .object({
    name: z.string().trim().min(1, 'Please enter your name.').max(100),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email('Please enter a valid email address.')
      .max(255),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(72, 'Password must be 72 characters or fewer.'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export async function register(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const validated = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Please fix the highlighted fields.',
    };
  }

  const { name, email, password } = validated.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const created = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    if (created.length === 0) {
      return {
        errors: { email: ['An account with this email already exists.'] },
        message: 'Could not create the account.',
      };
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { message: 'Database error: could not create the account.' };
  }

  // Sign the new person straight in.
  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/login');
    }
    throw error; // the successful sign-in redirect
  }
  return {};
}

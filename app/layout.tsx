//specialized component used to define a shared user interface that remains constant across multiple pages in a specified segment of the application
import type { Metadata } from 'next';
import '@/app/ui/global.css'; //global css import
import { inter } from '@/app/ui/fonts'; //imports the inter font

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Invoices, customers and revenue, built with Next.js.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the top navigation.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        // "Home" is exact; the others stay highlighted on their sub-pages
        // (e.g. /dashboard/invoices/create keeps "Invoices" active).
        const isActive =
          link.href === '/dashboard'
            ? pathname === link.href
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'flex items-center justify-center gap-2 border-b-2 px-3 text-sm font-medium transition-colors md:px-4',
              isActive
                ? 'border-ice-400 bg-night-800 text-ice-400'
                : 'border-transparent text-night-300 hover:bg-night-800 hover:text-ice-200',
            )}
          >
            <LinkIcon className="w-5" />
            <span className="hidden sm:block">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}

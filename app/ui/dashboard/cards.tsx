import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="border border-night-600 border-t-2 border-t-ice-400 bg-night-800 p-2">
      <div className="flex items-center p-4">
        {Icon ? <Icon className="h-5 w-5 text-ice-400" /> : null}
        <h3 className="ml-2 text-xs font-medium uppercase tracking-[0.12em] text-night-300">
          {title}
        </h3>
      </div>

      <p
        className={`${lusitana.className} truncate bg-night-900 px-4 py-8 text-center text-3xl text-ice-100`}
      >
        {value}
      </p>
    </div>
  );
}

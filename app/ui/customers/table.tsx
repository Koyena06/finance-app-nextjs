import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { FormattedCustomersTable } from '@/app/lib/definitions';

export default function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-night-600 bg-night-800 p-2 md:p-0">
              {customers.length === 0 ? (
                <p className="px-6 py-12 text-center text-sm text-night-300">
                  No customers found.
                </p>
              ) : null}

              <div className="md:hidden">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="mb-2 w-full border border-night-600 bg-night-900 p-4"
                  >
                    <div className="flex items-center justify-between border-b border-night-600 pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="border border-night-500"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-night-300">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b border-night-600 py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs uppercase tracking-[0.12em] text-night-300">
                          Pending
                        </p>
                        <p className="font-medium">{customer.total_pending}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs uppercase tracking-[0.12em] text-night-300">
                          Paid
                        </p>
                        <p className="font-medium text-ice-300">
                          {customer.total_paid}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm text-night-300">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>

              {customers.length > 0 ? (
                <table className="hidden min-w-full md:table">
                  <thead className="bg-night-900 text-left text-xs uppercase tracking-[0.12em] text-night-300">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Total Invoices
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Total Pending
                      </th>
                      <th scope="col" className="px-4 py-5 font-medium">
                        Total Paid
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-night-600">
                    {customers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="transition-colors hover:bg-night-700/40"
                      >
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="border border-night-500"
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-5 text-sm text-night-200">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap px-4 py-5 text-sm">
                          {customer.total_invoices}
                        </td>
                        <td className="whitespace-nowrap px-4 py-5 text-sm">
                          {customer.total_pending}
                        </td>
                        <td className="whitespace-nowrap px-4 py-5 text-sm font-medium text-ice-300">
                          {customer.total_paid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

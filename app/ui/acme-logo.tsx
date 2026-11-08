import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
  const small = size === 'sm';
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-ice-100`}
    >
      <GlobeAltIcon
        className={
          small
            ? 'h-7 w-7 text-ice-400'
            : 'h-12 w-12 rotate-[15deg] text-ice-400'
        }
      />
      <p className={small ? 'ml-2 text-2xl' : 'text-[44px]'}>Acme</p>
    </div>
  );
}

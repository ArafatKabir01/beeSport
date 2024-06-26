'use client';

import { useIsMounted } from '@/hooks/use-is-mounted';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { WiDaySnowThunderstorm } from 'react-icons/wi';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span>
          <WiDaySnowThunderstorm className="animate-bounce text-6xl" />
        </span>
      </div>
    );
  }

  return <HydrogenLayout>{children}</HydrogenLayout>;
}

'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/Navigation';

export function ConditionalNavigation() {
  const pathname = usePathname();
  const hiddenPaths = ['/', '/login', '/signup'];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return <Navigation />;
}

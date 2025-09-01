'use client';

import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

interface NavbarClientProps {
  menu: Menu[];
  siteName?: string;
}

export function NavbarClient({ menu, siteName }: NavbarClientProps) {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-white border-b border-gray-200">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoSquare siteName={siteName} />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block text-black">
              FREYARU
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-neutral-600 underline-offset-4 hover:text-black hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <div className="flex items-center space-x-2">
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}

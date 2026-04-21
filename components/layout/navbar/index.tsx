import LanguageSwitcher from 'components/LanguageSwitcher';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/bigcommerce';
import { VercelMenu as Menu } from 'lib/bigcommerce/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="p-[10px] flex items-center justify-start mr-2 lg:mr-6">
            <LogoSquare />
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-500 whitespace-nowrap underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <Link
              href="/blog"
              className="text-neutral-500 whitespace-nowrap underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              Blog
            </Link>
            </ul>
          ) : null}
        </div>

        <div className="hidden md:flex flex-1 min-w-0 justify-center">
          <Suspense>
            <Search />
          </Suspense>
        </div>
          <div className="flex justify-end md:w-1/3">
            
            {/* 🔥 给语言和购物车单独建一个“包厢”，在这里强制拉开间距！ */}
            <div className="flex items-center gap-4">
              <Suspense>
                <LanguageSwitcher />
              </Suspense>
              <Suspense fallback={<OpenCart />}>
                <Cart />
              </Suspense>
            </div>
          </div>
      </div>
    </nav>
  );
}

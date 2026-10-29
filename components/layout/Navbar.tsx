'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

type NavItem = { href: string; label: string; active: boolean };

/**
 * Fixed top bar. The 60px offset that keeps content clear of it lives once in
 * app/(main)/layout.tsx rather than in every page.
 */
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  // Every link closes the menu via its own onClick, so no effect is needed to
  // watch the pathname — and setState in an effect trips react-hooks lint.
  const items: NavItem[] = [
    {
      href: '/projects',
      label: 'Work',
      active: pathname === '/projects' || pathname.startsWith('/projects/'),
    },
    { href: '/about', label: 'About', active: pathname === '/about' },
    { href: isHome ? '#skills' : '/#skills', label: 'Stack', active: false },
  ];

  function NavLink({ item, block = false }: { item: NavItem; block?: boolean }) {
    const className = cn(
      'rounded-full text-[14.5px] font-medium no-underline transition-colors duration-200',
      block ? 'block px-4 py-[10px]' : 'px-[15px] py-[8px]',
      item.active ? 'bg-surface-2 text-text' : 'text-text-2 hover:bg-surface-2 hover:text-text',
    );

    const onClick = () => setMobileOpen(false);

    if (item.href.startsWith('#') || item.href.includes('#')) {
      return (
        <a href={item.href} className={className} onClick={onClick}>
          {item.label}
        </a>
      );
    }
    return (
      <Link href={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  return (
    <nav
      className="fixed inset-x-0 top-0 z-100 border-b border-line backdrop-blur-[14px] transition-[background,border-color] duration-200"
      style={{ background: 'var(--nav-bg)' }}
    >
      <div className="mx-auto flex h-[60px] w-full max-w-[1120px] items-center justify-between px-5 sm:px-6 lg:px-7">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[19px] font-bold tracking-[-0.3px] text-text no-underline"
        >
          <Image
            src="/logo-light.png"
            alt=""
            width={28}
            height={32}
            className="logo-light h-7 w-auto"
            priority
          />
          <Image
            src="/logo-dark.png"
            alt=""
            width={28}
            height={32}
            className="logo-dark h-7 w-auto"
            priority
          />
          rasa<span className="text-coral">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
          <a
            href="mailto:info@rafirasa.com"
            className="ml-2 rounded-full bg-text px-[18px] py-[9px] text-[14.5px] font-semibold text-bg no-underline transition-opacity duration-200 hover:opacity-90"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-text transition-colors duration-200 hover:border-line-strong"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        /* Solid, not the translucent nav background: page content showed through
           behind the menu items and made them hard to read. */
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-1 px-4 py-3 sm:px-5">
            {items.map((item) => (
              <NavLink key={item.label} item={item} block />
            ))}
            <a
              href="mailto:info@rafirasa.com"
              className="mt-1 rounded-full bg-text px-4 py-[11px] text-center text-[14.5px] font-semibold text-bg no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

'use client';

import { Moon, Sun } from 'lucide-react';

/**
 * Theme toggle with no React state.
 *
 * `data-theme` on <html> is already the single source of truth — the boot script
 * in app/layout.tsx sets it before paint. Mirroring it into state meant reading
 * the DOM in an effect and calling setState, which cascades a render and was the
 * repo's only lint error. Instead both icons render and CSS reveals the right one
 * (the same approach as the .logo-dark / .logo-light swap), so there is nothing
 * to synchronise and nothing to hydrate incorrectly.
 */
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private-mode or blocked storage: the toggle still works for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between the Biscuit and Dark Roast themes"
      title="Switch theme"
      className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-text-2 transition-colors duration-200 hover:border-line-strong hover:text-text"
    >
      <Moon size={17} className="theme-icon-light" aria-hidden="true" />
      <Sun size={17} className="theme-icon-dark" aria-hidden="true" />
    </button>
  );
}

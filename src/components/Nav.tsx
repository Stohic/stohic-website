import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { nav } from '@/content'
import { cn } from '@/lib/utils'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="surface-dark sticky top-0 z-50 border-b border-brand-700 bg-brand-900">
      <div className="shell flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-sans text-[1.125rem] font-black tracking-[-0.01em] text-white"
        >
          Stohic
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.875rem] text-brand-300 transition-colors duration-200 hover:text-white motion-reduce:transition-none"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile"
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-sm text-brand-300 md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      <nav
        id="nav-mobile"
        aria-label="Sections"
        className={cn('border-t border-brand-700 md:hidden', open ? 'block' : 'hidden')}
      >
        <ul className="shell flex flex-col py-2">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[0.9375rem] text-brand-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const surfaces = {
  white: 'bg-bg text-fg',
  card: 'bg-card text-fg',
  card2: 'bg-card-2 text-fg',
  dark: 'surface-dark bg-brand-900 text-brand-300',
  dark800: 'surface-dark bg-brand-800 text-brand-300',
} as const

export function Section({
  id,
  surface = 'white',
  labelledBy,
  className,
  children,
}: {
  id: string
  surface?: keyof typeof surfaces
  labelledBy: string
  className?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('scroll-mt-16 py-20 md:py-28', surfaces[surface], className)}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    // muted-fg, not muted: at 9px an eyebrow is small text, and muted only
    // reaches 4.34:1 on the card-2 surface.
    <p className={cn('eyebrow', dark ? 'text-accent' : 'text-muted-fg')}>{children}</p>
  )
}

export function Heading({
  id,
  children,
  dark = false,
}: {
  id: string
  children: ReactNode
  dark?: boolean
}) {
  return (
    <h2
      id={id}
      className={cn('section-heading mt-4 max-w-[22ch]', dark ? 'text-white' : 'text-brand-600')}
    >
      {children}
    </h2>
  )
}

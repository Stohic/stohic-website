import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Footnotes are scoped to the section that contains the claim, so the same note
 * can appear in more than one section without colliding. The `scope` prefix is
 * what keeps the DOM ids unique: footnote 1 in `what-you-get` is `fn-what-you-get-1`,
 * and footnote 1 in `cryptography` is `fn-cryptography-1`. Numbering restarts in
 * each section, which is why the note sits at the bottom of the section rather
 * than the bottom of the page.
 */

const refId = (scope: string, n: number) => `fnref-${scope}-${n}`
const noteId = (scope: string, n: number) => `fn-${scope}-${n}`

export function FootnoteRef({
  scope,
  n,
  dark = false,
}: {
  scope: string
  n: number
  dark?: boolean
}) {
  return (
    <sup className="ml-px leading-none">
      <a
        id={refId(scope, n)}
        href={`#${noteId(scope, n)}`}
        aria-label={`Footnote ${n}`}
        className={cn(
          // scroll-mt clears the sticky header when the back link jumps here.
          'scroll-mt-24 font-mono text-[0.65em] font-bold no-underline transition-opacity hover:opacity-70 motion-reduce:transition-none',
          dark ? 'text-accent' : 'text-brand-500',
        )}
      >
        {n}
      </a>
    </sup>
  )
}

export function FootnoteList({
  scope,
  notes,
  dark = false,
}: {
  scope: string
  notes: ReactNode[]
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'mt-14 border-t pt-6 md:mt-16',
        dark ? 'border-brand-700' : 'border-border',
      )}
    >
      <ol className="max-w-prose space-y-3">
        {notes.map((note, i) => {
          const n = i + 1
          return (
            <li
              key={n}
              id={noteId(scope, n)}
              className={cn(
                'grid scroll-mt-24 grid-cols-[1.25rem_1fr] gap-x-2 text-note',
                dark ? 'text-brand-300' : 'text-muted-fg',
              )}
            >
              <span
                aria-hidden="true"
                className={cn('font-mono font-bold', dark ? 'text-accent' : 'text-brand-500')}
              >
                {n}
              </span>
              <span>
                <span className="sr-only">{`Footnote ${n}. `}</span>
                {note}{' '}
                <a
                  href={`#${refId(scope, n)}`}
                  aria-label={`Back to footnote ${n} reference`}
                  className={cn(
                    'ml-0.5 whitespace-nowrap font-mono no-underline transition-opacity hover:opacity-70 motion-reduce:transition-none',
                    dark ? 'text-accent' : 'text-brand-500',
                  )}
                >
                  ↩
                </a>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge only knows Tailwind's stock scales. Custom fontSize keys like
 * `text-eyebrow` look like color utilities to it, so a later `text-muted-fg` in
 * the same cn() call silently drops the size. Teaching it the two custom keys
 * fixes that at the source rather than at each call site.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['eyebrow', 'note'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

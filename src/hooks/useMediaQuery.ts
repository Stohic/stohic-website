import { useSyncExternalStore } from 'react'

/**
 * matchMedia read as an external store rather than useState + useEffect, so the
 * first paint already has the right answer and the layout never flashes the
 * wrong breakpoint. Returns `fallback` during SSR or in environments without
 * matchMedia.
 */
export function useMediaQuery(query: string, fallback = false): boolean {
  const subscribe = (onChange: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {}
    const list = window.matchMedia(query)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }

  const getSnapshot = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return fallback
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, () => fallback)
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)', false)

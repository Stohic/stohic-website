import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-sm border border-border bg-bg px-3 py-2 font-sans text-[1rem] text-fg transition-colors placeholder:text-muted hover:border-brand-300 motion-reduce:transition-none',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }

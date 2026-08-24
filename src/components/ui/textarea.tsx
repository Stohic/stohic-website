import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[140px] w-full rounded-sm border border-border bg-bg px-3 py-2.5 font-sans text-[1rem] leading-[1.6] text-fg transition-colors placeholder:text-muted hover:border-brand-300 motion-reduce:transition-none',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }

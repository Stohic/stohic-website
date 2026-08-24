import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-sm font-sans font-bold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none',
  {
    variants: {
      variant: {
        accent: 'bg-accent text-brand-900 hover:bg-accent/85',
        solid: 'bg-brand-600 text-white hover:bg-brand-500',
        outline: 'border border-border bg-transparent text-fg hover:bg-card-2',
      },
      size: {
        default: 'h-11 px-6 text-[0.9375rem]',
        sm: 'h-9 px-4 text-[0.875rem]',
      },
    },
    defaultVariants: {
      variant: 'accent',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

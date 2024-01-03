import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-primary-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-950 focus:ring-offset-2 dark:border-primary-800 dark:focus:ring-primary-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-900 text-primary-50 hover:bg-primary-900/80 dark:bg-primary-50 dark:text-primary-900 dark:hover:bg-primary-50/80",
        secondary:
          "border-transparent bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        warning:
          "border-transparent bg-yellow-200 text-yellow-700",
        blue:
          "border-transparent bg-blue-200 text-blue",
        destructive:
          "border-transparent bg-red-200 text-red-500  dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/80",
        outline: "text-zinc-950 dark:text-zinc-50",
        'success-outline': 'border-transparent bg-primary-100 text-primary',
        borders: "text-zinc-950 dark:text-zinc-50",
        'success-border': 'border text-primary'
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

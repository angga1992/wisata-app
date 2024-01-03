"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { Info } from 'lucide-react';

import { cn } from "@/lib/utils"
import { Label } from "./label";

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName


const TooltipInformation = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer hover:text-primary">
          <Info size={18} />
        </TooltipTrigger>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            "z-50 overflow-hidden rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
            className
          )}
          {...props}
        >
          <Label className="text-md font-semibold">{ props["aria-label"] }</Label>
          <blockquote className="mt-6 border-l-2 pl-6 italic"> 
              { props["aria-description"] }
          </blockquote>
        </TooltipPrimitive.Content>
      </Tooltip>
  </TooltipProvider>
  
))
TooltipInformation.displayName = "TooltipInformation"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipInformation }

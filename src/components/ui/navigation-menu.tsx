import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import NextLink from 'next/link';

import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
import { UrlObject, Url } from "url";
import { ListItem } from "./list-item";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-50 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-primary-900 focus:primary-50 focus:text-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-primary-50 data-[state=open]:bg-primary-50 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50 dark:data-[active]:bg-zinc-800/50 dark:data-[state=open]:bg-zinc-800/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

// const NavigationMenuLink = NavigationMenuPrimitive.Link
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <Link
    href={props.href}
    isActive={props.active}
    className={className}
    {...props}
  />
))

type Href = string | undefined;
type Active = boolean | undefined;
type className =  string | undefined;
const variantsLink = cva(
  "",
  {
    variants: {
      variant: {
        active: "text-primary bg-primary", 
        default: "text-black",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Link = ({ href, isActive, className,  ...props } : { href : Href, isActive : Active, className : className }) => {
  const pathname = usePathname()
  
  if (href === undefined) {
    return (
      <NavigationMenuPrimitive.Link
        className={className}
        active={false} // Set active to false for undefined href
        {...props}
      />
    );
  }
  isActive = pathname === href;

  // If href is a string, convert it to a UrlObject
  const urlHref = { pathname: href } as UrlObject;
  return (
    <NextLink href={urlHref} passHref legacyBehavior>
      <NavigationMenuPrimitive.Link
        className={cn(variantsLink({ 
          variant : isActive ? 'active' : 'default' ,
        }), className)}
        active={isActive}
        {...props}
      />
    </NextLink>
  );
};

NavigationMenuLink.displayName =
  NavigationMenuPrimitive.Link.displayName

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-zinc-200 bg-white text-zinc-950 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 data-active:text-primary",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-zinc-200 shadow-md dark:bg-zinc-800" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

/**
 * 
 * @returns 
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary dark:bg-primary dark:text-white dark:hover:bg-primary",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-primary text-primary bg-transparent hover:bg-slate-100 hover:text-primary-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
export interface NavigationDropdownListItems {
  link : string,
  label : string,
  code? : string,
  descriptions? : string
}

interface NavigationDropdownListItemsProps {
  items? : NavigationDropdownListItems[],
  variant? : "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
  size? : 'default' | 'sm' | 'lg' | 'icon'
}

interface NavigationDropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  NavigationDropdownListItemsProps {}

const NavigationDropdownList = React.forwardRef<
  HTMLButtonElement,
  NavigationDropdownProps
>(({ className, title, children, items, variant, size, ...props }, ref) => {
  return (
    <NavigationMenu className="z-10">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(buttonVariants({
            variant : variant,
            size : size
          }))}>
            { children }
          </NavigationMenuTrigger>
          <NavigationMenuContent >
            <ul className="grid grid-cols-1 gap-2 p-2 w-[225px]">
              {
                Array.isArray(items) &&
                items.map((items, i) => {
                  return (
                    <ListItem key={i} href={items.link} title={items.label}>
                      { items.descriptions }
                    </ListItem>
                  )
                })
              }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
})
NavigationDropdownList.displayName = "NavigationDropdownList"

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationDropdownList
}

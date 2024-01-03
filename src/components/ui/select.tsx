"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { MdHighlightOff  } from "react-icons/md"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  hasBorder?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, hasBorder = true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-min-10 w-full items-center justify-between rounded-md",
      hasBorder ? "border border-slate-200" : "",
      "bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>
      <div className="text-start flex items-center gap-2">
        { children } <br />
        <span className="text-sm text-gray-dark-200">{ props?.about }</span>
      </div>
    </SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName


/**
 * select - 2
 */

export interface select2Interface {
  value? : string,
  label? : string,
  information? :string, 
  additional? : React.ReactNode | undefined
}

interface Select2Props {
  onChange : (val:string) => void,
  value : string | undefined
  items: select2Interface[];
  isMulti? : boolean, 
}

const Select2: React.FC<Select2Props> = ({ items, onChange, value, isMulti = false }: Select2Props) => {
  
  const [multiSelect, setMultiSelect] = React.useState<typeof value[]>([])

  React.useEffect(() => {
    onChange(multiSelect.toString())
  }, [multiSelect])

  React.useEffect(() => {
    console.log(value);
    
    let arr:string[] = [];
    value?.split(',').map((val) => {
      if (val !== '') {
        arr.push(val)
      }
    })

    setMultiSelect(arr)
  }, [value])

  const checkValue: (val: select2Interface) => CheckedState | undefined = (val: select2Interface) => {
    const matchingItems = multiSelect.filter(cnt => cnt === val.value);
  
    if (matchingItems.length === 0) {
      return undefined; // or return an empty array based on your needs
    } else {
      return true;
    }
  
  };

  return (
    <Select onValueChange={(valSelect) => {
      if (isMulti) {
        if (!valSelect) {
          return
        }
        const index = multiSelect.indexOf(valSelect)
        if (index > 0) {
          setMultiSelect([
            ...multiSelect.slice(0, index),
            ...multiSelect.slice(index + 1),
          ])
        } else if (index === 0) {
          setMultiSelect([...multiSelect.slice(1)])
        } else {
          setMultiSelect([...multiSelect, valSelect])
        }
      } else {
        onChange(valSelect)
      }
    }} value={isMulti ? multiSelect.toString() : value}>
      <SelectTrigger className="min-w-[280px]">
        <SelectPrimitive.Value aria-label={isMulti ? multiSelect.toString() : value} placeholder='Select Value'>
          {
            isMulti ? 
              multiSelect.map((val, i) => <Badge onClick={() => console.log('Clicked')
              } key={i} variant={`success-outline`} className="mr-1"> {items.map((cnt) => cnt.value === val ? cnt.label : '')} <MdHighlightOff /></Badge>)
            : items.map((cnt) => cnt.value === value ? cnt.label : '')
          }
        </SelectPrimitive.Value>
      </SelectTrigger>
      <SelectContent>
          {
            items.map((val, i) => (
              <SelectItem key={i} value={val.value || ''} className="font-semibold">
                  { isMulti ? <><Checkbox id={val.value} checked={ checkValue(val) } /> {val.label} </>  : val.label }
              </SelectItem>
            ))
          }
      </SelectContent>
    </Select>
  );
}


export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  Select2
}

"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-[48px] items-center justify-center rounded-none bg-zinc-100 border-1 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "border-x border-t border-gray-200 flex items-center text-[#B0B3BB] justify-center whitespace-nowrap rounded-sm px-3 py-3 gap-1 text-sm font-medium ring-offset-gray-900 transition-all focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 dark:data-[state=active]:bg-zinc-950 dark:data-[state=active]:text-zinc-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-1 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export interface TabInterface {
  name: string;
  key: string;
  icon?: React.ReactNode;
  content?: string;
}

interface TabProps {
  tabs: TabInterface[];
  flexWrap?: boolean;
  defaultActive?: string;
  onTabClick?: (key: string) => void;
}


const Tab: React.FC<TabProps> = ({ tabs, flexWrap = "100%", defaultActive = 'tanah-bangunan', onTabClick }) => {
  const [activeTab, setActiveTab] = React.useState('');

  const handleTabClick = (tab: TabInterface) => {
    setActiveTab(tab.key);
    if (onTabClick) {
      onTabClick(tab.key);
    }
  };

  return (
    <Tabs defaultValue={defaultActive} className="w-full">
      <TabsList style={{ width: flexWrap ? '100%' : '' }}>
        {tabs.map((val, i) => (
          <TabsTrigger
            key={i}
            value={val.key}
            style={{ width: flexWrap ? '100%' : '' }}
            onClick={() => handleTabClick(val)}
          >
            {val.icon !== undefined && val.icon} {val.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((val, i) => (
        <TabsContent key={i} value={val.key}>
          {val.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};


/**
 * tab with pararel routes
 */
interface TabRoutesProps {
  tabs: TabInterface[],
  basePath: string,
  current: string | null,
}

const TabContentParalelRoutes = ({ ukey, content, base }: { name: string, ukey: string, content?: string, base: string }) => {
  const segment = useSelectedLayoutSegment(`./${base}/${content}`);
  return (
    <TabsContent value={ukey}>
      <React.Suspense fallback={<span>Loading...</span>}>{segment} </React.Suspense>
    </TabsContent>
  )
}

const TabRoutes: React.FC<TabRoutesProps> = ({ tabs, basePath, current }) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    if (current === null) {
      setValue(tabs[0].key)
    } else {
      setValue(current)
    }
  }, [current, tabs])

  return (
    <Tabs defaultValue={value} className="w-full" value={value} >
      <TabsList>
        {
          tabs.map((val, i) => {
            return (
              <Link key={i} href={`/${basePath}/${val.key}`}>
                <TabsTrigger value={val.key} className="grid grid-flow-col gap-2 items-center justify-between">
                  {val.icon !== undefined && val.icon} {val.name}
                </TabsTrigger>
              </Link>
            )
          })
        }
      </TabsList>
      {
        tabs.map((val, i) => {
          return <TabContentParalelRoutes key={i} name={val.name} ukey={val.key} content={val.content} base={basePath} />
        })
      }
    </Tabs>
  );
};

export default Tab;

export { Tabs, TabsList, TabsTrigger, TabsContent, TabRoutes }

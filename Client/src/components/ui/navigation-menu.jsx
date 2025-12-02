import React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium " +
        "transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent " +
        "focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}{" "}
    <svg
      className="ml-1 h-3 w-3 transition-transform group-data-[state=open]:rotate-180"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M1.5 5.5l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "absolute left-0 top-0 w-full md:absolute md:w-auto rounded-md bg-popover p-4 shadow-lg",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = React.forwardRef(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      "block select-none rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors " +
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none",
      className
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = "NavigationMenuLink";

const NavigationMenuViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center w-full">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        "relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md " +
          "bg-popover shadow-lg transition-all duration-300 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};

import React, { createContext, useContext, useState, useMemo, useCallback, useEffect, forwardRef } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PanelLeft } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const SidebarContext = createContext(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
}

export const SidebarProvider = forwardRef(({ defaultOpen = true, children, style, className }, ref) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) setOpenMobile(prev => !prev);
    else setOpen(prev => !prev);
  }, [isMobile]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(() => ({
    state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar
  }), [state, open, isMobile, openMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          ref={ref}
          style={{ "--sidebar-width": "16rem", "--sidebar-width-icon": "3rem", ...style }}
          className={cn("group/sidebar-wrapper flex min-h-screen w-full", className)}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

export const Sidebar = forwardRef(({ side = "left", children, className }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent className="w-[18rem] bg-sidebar p-0 text-sidebar-foreground">
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      data-state={state}
      data-side={side}
      className={cn("fixed inset-y-0 z-10 flex w-[var(--sidebar-width)] flex-col bg-sidebar text-sidebar-foreground", className)}
    >
      {children}
    </div>
  );
});
Sidebar.displayName = "Sidebar";

export const SidebarTrigger = forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(e) => { onClick?.(e); toggleSidebar(); }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export const SidebarContent = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-2 overflow-auto", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

export const SidebarHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 p-2", className)} {...props} />
));
SidebarHeader.displayName = "SidebarHeader";

export const SidebarFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 p-2", className)} {...props} />
));
SidebarFooter.displayName = "SidebarFooter";

export const SidebarSeparator = forwardRef(({ className, ...props }, ref) => (
  <Separator ref={ref} className={cn("mx-2 w-auto bg-sidebar-border", className)} {...props} />
));
SidebarSeparator.displayName = "SidebarSeparator";

export const SidebarInput = forwardRef(({ className, ...props }, ref) => (
  <Input ref={ref} className={cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className)} {...props} />
));
SidebarInput.displayName = "SidebarInput";

export const SidebarGroup = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2 p-2", className)} {...props} />
));
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return <Comp ref={ref} className={cn("text-xs font-medium text-sidebar-foreground/70 px-2", className)} {...props} />;
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export const SidebarMenu = forwardRef(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

export const SidebarMenuItem = forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

export const SidebarMenuButton = forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} {...props} />;
});
SidebarMenuButton.displayName = "SidebarMenuButton";

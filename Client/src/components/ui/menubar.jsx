import React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

// Root Menubar
const Menubar = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-10 items-center space-x-1 rounded-md border bg-background p-1 ${className}`}
    {...props}
  />
));
Menubar.displayName = "Menubar";

// Trigger (button in menubar)
const MenubarTrigger = React.forwardRef(({ className = "", ...props }, ref) => (
  <button
    ref={ref}
    className={`flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
    {...props}
  />
));
MenubarTrigger.displayName = "MenubarTrigger";

// Sub menu trigger
const MenubarSubTrigger = React.forwardRef(
  ({ className = "", inset, children, ...props }, ref) => (
    <button
      ref={ref}
      className={`flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
        inset ? "pl-8" : ""
      } ${className}`}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  )
);
MenubarSubTrigger.displayName = "MenubarSubTrigger";

// Sub content
const MenubarSubContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
    {...props}
  />
));
MenubarSubContent.displayName = "MenubarSubContent";

// Content
const MenubarContent = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`z-50 min-w-[12rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md ${className}`}
    {...props}
  />
));
MenubarContent.displayName = "MenubarContent";

// Item
const MenubarItem = React.forwardRef(({ className = "", inset, ...props }, ref) => (
  <button
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
      inset ? "pl-8" : ""
    } ${className}`}
    {...props}
  />
));
MenubarItem.displayName = "MenubarItem";

// Checkbox Item
const MenubarCheckboxItem = React.forwardRef(
  ({ className = "", children, checked, ...props }, ref) => (
    <button
      ref={ref}
      className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  )
);
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

// Radio Item
const MenubarRadioItem = React.forwardRef(
  ({ className = "", children, checked, ...props }, ref) => (
    <button
      ref={ref}
      className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${className}`}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </button>
  )
);
MenubarRadioItem.displayName = "MenubarRadioItem";

// Label
const MenubarLabel = React.forwardRef(({ className = "", inset, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-2 py-1.5 text-sm font-semibold ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  />
));
MenubarLabel.displayName = "MenubarLabel";

// Separator
const MenubarSeparator = React.forwardRef(({ className = "", ...props }, ref) => (
  <div ref={ref} className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />
));
MenubarSeparator.displayName = "MenubarSeparator";

// Shortcut text
const MenubarShortcut = ({ className = "", ...props }) => (
  <span
    className={`ml-auto text-xs tracking-widest text-muted-foreground ${className}`}
    {...props}
  />
);

export {
  Menubar,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioItem,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarShortcut,
};

import React, { forwardRef } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

// Root Components
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={`fixed inset-0 z-50 bg-black/80 
      data-[state=open]:animate-in 
      data-[state=closed]:animate-out 
      data-[state=closed]:fade-out-0 
      data-[state=open]:fade-in-0 ${className}`}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg 
        -translate-x-1/2 -translate-y-1/2 gap-4 border 
        bg-white p-6 shadow-lg duration-200 
        data-[state=open]:animate-in 
        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=open]:fade-in-0 
        data-[state=closed]:zoom-out-95 
        data-[state=open]:zoom-in-95 
        data-[state=closed]:slide-out-to-left-1/2 
        data-[state=closed]:slide-out-to-top-[48%] 
        data-[state=open]:slide-in-from-left-1/2 
        data-[state=open]:slide-in-from-top-[48%] 
        sm:rounded-lg ${className}`}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-2 text-center sm:text-left ${className}`}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold ${className}`}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={`text-sm text-gray-500 ${className}`}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md 
      bg-blue-600 px-4 py-2 text-sm font-medium text-white 
      hover:bg-blue-700 focus:outline-none focus:ring-2 
      focus:ring-blue-500 disabled:opacity-50 ${className}`}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = forwardRef(({ className = "", ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={`inline-flex items-center justify-center rounded-md border 
      border-gray-300 bg-white px-4 py-2 text-sm font-medium 
      text-gray-700 hover:bg-gray-100 focus:outline-none 
      focus:ring-2 focus:ring-gray-400 sm:mt-0 mt-2 ${className}`}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

import React, { forwardRef } from "react";

const Alert = forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseClasses =
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:-translate-y-[3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current";

  const variants = {
    default: "bg-white text-gray-900 border-gray-200",
    destructive:
      "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600",
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={`${baseClasses} ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = forwardRef(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

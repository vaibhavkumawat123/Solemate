import React from "react";

const baseClasses =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

// variant styles
const variantClasses = {
  default: "bg-indigo-600 text-white hover:bg-indigo-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-900",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "hover:bg-gray-100 text-gray-900",
  link: "text-indigo-600 underline-offset-4 hover:underline",
};

// size styles
const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 px-8 rounded-lg",
  icon: "h-10 w-10 p-0 flex items-center justify-center",
};

const Button = React.forwardRef(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

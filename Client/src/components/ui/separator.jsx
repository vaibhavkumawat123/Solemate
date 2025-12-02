import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

const Separator = React.forwardRef(({ className = "", orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={`shrink-0 bg-gray-300 ${orientation === "horizontal" ? "h-px w-full" : "w-px h-full"} ${className}`}
    {...props}
  />
));

Separator.displayName = "Separator";

export { Separator };

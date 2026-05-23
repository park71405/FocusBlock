import * as checkboxPrimitive from "@radix-ui/react-checkbox";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import * as React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef<
    React.ComponentRef<typeof checkboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof checkboxPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <checkboxPrimitive.Root
        ref={ref}
        className={cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className   
        )}
        {...props}
    >
      <checkboxPrimitive.Indicator 
        className={cn("flex items-center justify-center text-current")}>
        <RiCheckboxBlankCircleLine className="h-4 w-4" />
      </checkboxPrimitive.Indicator>
    </checkboxPrimitive.Root>
  )
);
Checkbox.displayName = checkboxPrimitive.Root.displayName;

export { Checkbox };

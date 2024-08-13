"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { useField } from "formik";
import { cn } from "../../lib/utils/tailwindUtils";

const Checkbox = React.forwardRef(
  ({ className, label, ...props }: any, ref): any => {
    const [field, meta, helpers] = useField(props);

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-slate-200  ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-slate-900 data-[state=checked]:text-slate-50 dark:border-slate-800  dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=checked]:bg-slate-50 dark:data-[state=checked]:text-slate-900",
          className
        )}
        checked={field.value.includes(props.value)}
        onCheckedChange={(isChecked) => {
          if (isChecked) {
            helpers.setValue([...field.value, props.value]);
          } else {
            helpers.setValue(
              field.value.filter((val: any) => val !== props.value)
            );
          }
        }}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4 bg-white text-background" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

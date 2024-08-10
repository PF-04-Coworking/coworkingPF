import React from "react";
import clsx from "clsx";

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "outline" | "destructive";
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, variant, ...props }, ref) => {
    const baseClassName =
      "inline-flex items-center justify-center font-medium rounded-md focus:outline-none px-4 py-3 transition transition-colors text-sm border-2 border-primary";
    const variantClassName = {
      primary:
        "border border-primary hover:border-primaryDark bg-primary text-white hover:bg-primaryDark disabled:bg-opacity-30 border-opacity-30 disabled:cursor-not-allowed",
      outline:
        "border border-primary bg-transparent hover:text-primary text-white",
      destructive:
        "border border-red-500 bg-red-500 hover:bg-red-600 hover:border-red-600 text-white",
    };
    const finalClassName = clsx(
      baseClassName,
      variantClassName[variant],
      className
    );

    return (
      <button ref={ref} className={finalClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };

import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "outline";
  className?: string;
}

const Button = ({ children, className, variant, ...props }: IProps) => {
  const baseClassName =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none px-4 py-2 transition transition-colors text-sm";
  const variantClassName = {
    primary:
      "border border-primary hover:border-primaryDark bg-primary text-white hover:bg-primaryDark text-white",
    outline:
      "border border-primary bg-transparent hover:text-primary text-white",
  };
  const finalClassName = clsx(
    baseClassName,
    variantClassName[variant],
    className
  );

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export { Button };

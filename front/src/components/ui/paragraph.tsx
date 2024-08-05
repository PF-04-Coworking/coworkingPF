import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLParagraphElement> {
  variant: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const Paragraph = ({
  children,
  className,
  variant,
  size = "md",
  ...props
}: IProps) => {
  const baseClassName = "";
  const variantClassName = {
    primary: "text-white",
    secondary: "text-secondary",
  };
  const sizeClassName = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };
  const finalClassName = clsx(
    baseClassName,
    variantClassName[variant],
    sizeClassName[size],
    className
  );

  return (
    <p className={finalClassName} {...props}>
      {children}
    </p>
  );
};

export { Paragraph };

import clsx from "clsx";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: "1" | "2";
  className?: string;
}

const Card = ({ className, children, ...props }: IProps) => {
  const baseClassName = "p-6 rounded-lg";
  const variantClassName = {
    1: "bg-primary",
    2: "bg-secondaryDark",
  };
  const finalClassName = clsx(
    baseClassName,
    variantClassName[props.variant],
    className
  );

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export { Card };

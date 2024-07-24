import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  level: "1" | "2" | "3";
  className?: string;
}

const Heading = ({ children, className, level, ...props }: IProps) => {
  const baseClassName = "text-white";
  const levelClassName = {
    1: "text-2xl",
    2: "text-xl",
    3: "text-lg",
  };
  const finalClassName = clsx(baseClassName, levelClassName[level], className);

  return (
    <h3 className={finalClassName} {...props}>
      {children}
    </h3>
  );
};

export { Heading };

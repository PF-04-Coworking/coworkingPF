import clsx from "clsx";

interface IProps extends React.ButtonHTMLAttributes<HTMLHeadingElement> {
  level: "1" | "2" | "3";
  className?: string;
}

const Heading = ({ children, className, level, ...props }: IProps) => {
  const baseClassName = "text-white leading-tighter";
  const levelClassName = {
    1: "text-8xl",
    2: "text-4xl",
    3: "text-xl",
  };
  const finalClassName = clsx(baseClassName, levelClassName[level], className);

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Tag className={finalClassName} {...props}>
      {children}
    </Tag>
  );
};

export { Heading };

import clsx from "clsx";
import Link, { LinkProps } from "next/link";

interface IProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomLink = ({ children, className, ...props }: IProps): JSX.Element => {
  const baseClassName = "text-secondary hover:text-white";
  const finalClassName = clsx(baseClassName, className);

  return (
    <Link className={finalClassName} {...props}>
      {children}
    </Link>
  );
};

export { CustomLink };

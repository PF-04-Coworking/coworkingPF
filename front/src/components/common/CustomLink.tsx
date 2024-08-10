"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface IProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomLink = ({ children, className, ...props }: IProps): JSX.Element => {
  const pathname = usePathname();

  const baseClassName = "text-secondary hover:text-white text-sm";
  const activeClassName = "text-white";
  const finalClassName = clsx(baseClassName, className, {
    [activeClassName]: props.href === pathname,
  });

  return (
    <Link className={finalClassName} {...props}>
      {children}
    </Link>
  );
};

export { CustomLink };

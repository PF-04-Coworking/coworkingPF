import clsx from "clsx";

interface IProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

const Badge = ({ className, children, ...props }: IProps) => {
  const baseClassName =
    "text-xs flex items-center gap-x-2 text-white rounded-md p-2.5 bg-background";

  return (
    <div className={clsx(baseClassName, className)} {...props}>
      {children}
    </div>
  );
};

export { Badge };

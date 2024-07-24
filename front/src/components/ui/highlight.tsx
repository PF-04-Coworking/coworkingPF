interface IProps extends React.ButtonHTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const Highlight = ({ children, className, ...props }: IProps) => {
  const baseClassName = "text-primary";

  return (
    <span className={baseClassName} {...props}>
      {children}
    </span>
  );
};

export { Highlight };

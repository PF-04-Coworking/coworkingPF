interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={`block text-sm font-medium text-white ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export { InputLabel };

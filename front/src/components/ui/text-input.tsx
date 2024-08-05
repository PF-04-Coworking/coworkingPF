import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TextInput = ({ className, ...props }: IProps) => {
  const baseClassName =
    "rounded-md border-2 border-primary bg-background px-4 py-2 text-sm";

  return (
    <input type="text" className={clsx(baseClassName, className)} {...props} />
  );
};

export { TextInput };

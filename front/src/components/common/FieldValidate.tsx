import React from "react";
import { ErrorMessage, Field, useFormikContext, FieldProps } from "formik";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  as?: keyof JSX.IntrinsicElements;
  name: string;
}

const FieldValidate: React.FC<IProps> = ({
  as = "input",
  name,
  type,
  placeholder,
  ...rest
}) => {
  const { errors, touched } = useFormikContext<any>();

  const borderColor =
    errors[name] && touched[name]
      ? "border-red-400"
      : touched[name]
      ? "border-primary"
      : "border-primary";

  return (
    <>
      <Field
        as={as}
        className={`rounded-md py-3 px-3 mb-1 text-sm w-full bg-inherit text-white border focus:outline-none disabled:bg-secondaryDark disabled:text-secondary ${borderColor}`}
        type={type}
        name={name}
        placeholder={placeholder}
        {...rest}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-400 text-sm"
      />
    </>
  );
};

export { FieldValidate };

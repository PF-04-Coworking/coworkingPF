import { ErrorMessage, Field, useFormikContext } from "formik";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FieldValidate: React.FC<IProps> = ({ ...props }) => {
  const { errors, touched, setFieldTouched }: any = useFormikContext();
  const { name = "", type, placeholder, ...rest } = props;

  return (
    <>
      <Field
        className={`rounded-md py-3 px-3 mb-1 text-sm w-full bg-inherit text-white border focus:outline-none disabled:bg-secondaryDark disabled:text-secondary ${
          errors[name] && touched[name]
            ? "border-red-500"
            : touched[name]
            ? "border-green-500"
            : "border-primary"
        }`}
        type={type}
        name={name}
        placeholder={placeholder}
        onFocus={() => setFieldTouched(name, true, true)}
        {...rest}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </>
  );
};

export { FieldValidate };

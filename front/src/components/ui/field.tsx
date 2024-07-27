import { ErrorMessage, Field, useFormikContext } from "formik";
import { ReactHTMLElement, useEffect, useState } from "react";

interface FieldValidateProps {
    name: string;
    type: string;
    placeholder: string;
  }
  
  const FieldValidate: React.FC<FieldValidateProps> = ({ name, type, placeholder}) => {
    const { errors, touched, setFieldTouched}: any = useFormikContext();

    return (
      <div className="relative">
        <Field
          className={`rounded-[10px] h-[60px] py-2 mt-1 mb-5 text-md w-full bg-inherit text-white border focus:outline-none pl-5  ${
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
        />

        <ErrorMessage
          name={name}
          component="div"
          className="text-red-600 mb-[10px]"
        />
      </div>
    );
  };
  
  export default FieldValidate;
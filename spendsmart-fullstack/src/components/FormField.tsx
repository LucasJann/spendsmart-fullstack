import { useEffect, useState } from "react";
import Input from "./Input";

interface FormFieldProperties {
  id: string;
  type: string;
  name: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: string;
  className: string;
  isError: boolean;
  placeholder: string;
}

const FormField: React.FC<FormFieldProperties> = ({
  id,
  type,
  name,
  value,
  error,
  onChange,
  children,
  className,
  isError,
  placeholder,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage === "") {
      setErrorMessage(error);
    }
  }, [isError]);

  return (
    <div>
      <h2 className={isError ? "mt-2 text-red-400" : "mt-2"}>{children}</h2>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
      {isError && <p className="text-red-400 text-xs">{errorMessage}</p>}
      <hr />
    </div>
  );
};

export default FormField;

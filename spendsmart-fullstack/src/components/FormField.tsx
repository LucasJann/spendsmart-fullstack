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
  nameError: boolean;
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
  nameError,
  placeholder,
}) => {
  return (
    <div>
      <h2
        className={
          nameError
            ? "mt-2 text-red-400"
            : "mt-2"
        }
      >
        {children}
      </h2>
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
      {nameError && <p className="text-red-400 text-xs">{error}</p>}
      <hr />
    </div>
  );
};

export default FormField;

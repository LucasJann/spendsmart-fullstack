import Input from "./Input";

interface FormFieldProperties {
  id: string;
  type: string;
  name: string;
  className: string;
  placeholder: string;
  value: string;
  error: string;
  nameError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: string;
}

const FormField: React.FC<FormFieldProperties> = ({
  id,
  type,
  name,
  className,
  placeholder,
  children,
  nameError,
  value,
  error,
  onChange,
}) => {
  return (
    <div>
      <h2
        className={
          nameError
            ? " caret-transparent mt-2 text-red-400"
            : "caret-transparent mt-2"
        }
      >
        {children}
      </h2>
      <Input
        id={id}
        type={type}
        name={name}
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {nameError && <p className="text-red-400 text-xs">{error}</p>}
      <hr />
    </div>
  );
};

export default FormField;

import React from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  onChange,
  className,
  value,
  disabled,
  placeholder,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      onChange={onChange}
      className={className}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default Input;

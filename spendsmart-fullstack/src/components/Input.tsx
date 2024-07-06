import React from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  disabled
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default Input;

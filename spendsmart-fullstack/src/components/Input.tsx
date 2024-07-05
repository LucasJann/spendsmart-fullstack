import React from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
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
    />
  );
};

export default Input;

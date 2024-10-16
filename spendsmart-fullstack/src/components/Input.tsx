import React from "react";

interface InputProps {
  id: string;
  name: string;
  type: string;
  value?: string | number;
  disabled?: boolean;
  className: string;
  placeholder?: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  value,
  disabled,
  className,
  placeholder,
  onClick,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
      className={className + " mb-2"}
      placeholder={placeholder}
      onClick={onClick}
      onChange={onChange}
    />
  );
};

export default Input;

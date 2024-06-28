import React from "react";

interface InputProps {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
    />
  );
};

export default Input;

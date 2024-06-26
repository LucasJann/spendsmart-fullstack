import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder }) => {
  return (
    <input
      className="block w-full mb-2 rounded-md shadow-sm focus:ring-0 border-transparent bg-transparent text-gray-400"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
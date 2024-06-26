import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  children?: ReactNode;
  className: string;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type,
  className,
  isSelected,
}) => {
  if (isSelected) {
    className = `${className + "border-b-2 border-red-500"}`;
    console.log(className);
  }

  return (
    <>
      <button onClick={onClick} type={type} className={className}>
        {children}
      </button>
    </>
  );
};

export default Button;

import React, { ReactNode } from "react";

interface ButtonProps {
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: "submit" | "reset" | "button";
  children?: ReactNode;
  className?: string;
  isSelected?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  id,
  onClick,
  children,
  type,
  className,
  isSelected,
  disabled,
}) => {
  if (isSelected) {
    disabled = true;
    className = `${className + " border-b-2 border-red-500"}`;
  }

  return (
    <>
      <button
        id={id}
        onClick={onClick}
        type={type}
        className={className}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

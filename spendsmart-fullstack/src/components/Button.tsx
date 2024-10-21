import React, { ReactNode } from "react";

interface ButtonProps {
  id: string;
  type: "submit" | "reset" | "button";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
  children?: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  id,
  type,
  onClick,
  disabled,
  children,
  className,
  isSelected,
}) => {
  if (isSelected) {
    disabled = true;
    className = `${className + " border-b-2 border-red-500"}`;
  }

  return (
    <>
      <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

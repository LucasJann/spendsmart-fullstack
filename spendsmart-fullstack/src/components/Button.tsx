import React, { ReactNode } from "react";

interface ButtonProps {
  id: string;
  type: "submit" | "reset" | "button";
  className: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  id,
  type,
  className,
  onClick,
  children,
  disabled,
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
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;

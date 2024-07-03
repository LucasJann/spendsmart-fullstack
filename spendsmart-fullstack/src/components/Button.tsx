import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  children?: ReactNode;
  className?: string;
  isSelected?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
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

import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  type?: "submit" | "reset" | "button";
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  return (
    <>
      <button onClick={onClick} type={type}>
        {children}
      </button>
    </>
  );
};

export default Button;

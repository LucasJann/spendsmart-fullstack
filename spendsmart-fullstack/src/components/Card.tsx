import React, { ReactNode } from "react";

interface CardProperties {
    children: ReactNode;
}

const Card: React.FC<CardProperties> = ({ children }) => {
  return <div className="w-full rounded-sm bg-white">{children}</div>;
};

export default Card;

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface IProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip = ({ children, text }: IProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute bottom-full mb-2 px-2 py-1 bg-secondaryDark text-white text-xs rounded-md whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export { Tooltip };

import React from "react";
interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative inline-block group">
      <div className="hidden group-hover:block whitespace-nowrap absolute bottom-[110%] transform -translate-x-1/2 bg-gray-100 text-black border-none text-xs py-1 px-2 rounded-md">
        {text}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;

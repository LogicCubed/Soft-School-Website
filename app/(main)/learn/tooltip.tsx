import React from "react";

type TooltipProps = {
  show: boolean;
  children: React.ReactNode;
};

export const Tooltip = ({ show, children }: TooltipProps) => {
  return (
    <div
      className={`absolute left-1/2 top-full mt-2 w-max max-w-xs rounded-xl bg-white px-3 py-2 text-sm text-neutral-700 shadow-xl border transition-transform origin-top-center ${
        show ? "scale-100" : "scale-0"
      }`}
      style={{ transformOrigin: "top center", transition: "transform 0.2s ease-in-out" }}
    >
      {children}
      <div className="absolute left-1/2 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white transform -translate-x-1/2" />
    </div>
  );
};
"use client";

import { ReactNode, useState, useRef, useEffect } from "react";

type LessonTooltipProps = {
  children: ReactNode;
  locked?: boolean;
  unit?: string | number;
  lessonNumber?: number;
};

const LessonTooltip = ({ children, locked = false }: LessonTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!locked) return <>{children}</>;

return (
    <div className="relative" ref={tooltipRef}>
        <div onClick={() => setShowTooltip(!showTooltip)}>
            {children}
        </div>

        <div
            className={`
                absolute top-full left-1/2 transform -translate-x-1/2 z-10
                transition-all duration-300 ease-in-out
                ${showTooltip ? "scale-100 pointer-events-auto" : "scale-0 pointer-events-none"}
            `}
            style={{ transformOrigin: "top center" }}
        >
            <div className="w-0 h-0 border-l-12 border-r-12 border-b-12 border-l-transparent border-r-transparent border-b-slate-500 mx-auto" />
            <div className="w-64 rounded-xl bg-slate-700 border-4 border-slate-500 p-2 text-center text-base font-bold text-slate-300">
                Complete all levels above to unlock this!
            </div>
        </div>
    </div>
  );
};

export default LessonTooltip;
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StreakCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const daysArray = Array.from({ length: firstDayOfWeek }, () => "")
    .concat(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()));

  return (
    <div className="relative flex flex-col items-center">
            <div className="w-0 h-0 border-l-18 border-r-18 border-b-18 border-l-transparent border-r-transparent border-b-slate-500"/>
        <div className="w-64 rounded-xl bg-slate-700 border-8 border-slate-500 p-4 text-white">
            <div className="relative flex items-center justify-center mb-2">
                <div className="absolute left-0">
                    <Button variant="ghost" size="sm" onClick={handlePrevMonth} className="cursor-pointer">
                        <ChevronLeft strokeWidth={5}/>
                    </Button>
                </div>
                <h3 className="font-extrabold text-lg text-center">{monthName} {year}</h3>
                <div className="absolute right-0">
                    <Button variant="ghost" size="sm" onClick={handleNextMonth} className="cursor-pointer">
                        <ChevronRight strokeWidth={5}/>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-extrabold mb-2">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
                {daysArray.map((day, i) => (
                    <span key={i} className={`p-1 rounded hover:bg-slate-600 cursor-pointer ${day === "" ? "bg-transparent" : ""}`}>
                        {day}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
};

export default StreakCalendar;
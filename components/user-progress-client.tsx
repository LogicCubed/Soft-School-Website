"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import StreakCalendar from "./streak-calendar";

type Props = {
  activeCourse: {
    title: string;
    imageSrc: string;
  };
  points: number;
  streak: number;
};

export const UserProgressClient = ({ activeCourse, points, streak }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost" className="cursor-pointer">
          <Image src={activeCourse.imageSrc} alt={activeCourse.title} width={32} height={32} />
        </Button>
      </Link>

      <div className="relative">
        <Button
            variant="ghost"
            className="text-[#ff9d00] font-extrabold cursor-pointer relative"
            onClick={() => setShowCalendar(!showCalendar)}
        >
            <Image src="/streak.svg" alt="Points" height={28} width={28} className="mr-2"/>
            {streak}
        </Button>
        {showCalendar && (
            <div ref={calendarRef} className="absolute top-full left-1/2 transform -translate-x-1/2 z-50">
                <StreakCalendar/>
            </div>
        )}
      </div>

      <Link href="/profile">
        <Button variant="ghost" className="text-[#ffcc00] font-extrabold cursor-pointer">
          <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2" />
          {points}
        </Button>
      </Link>
    </div>
  );
};
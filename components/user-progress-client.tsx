"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import StreakCalendar from "./widgets/streak-calendar";

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
    <div className="flex items-center justify-center gap-x-4">
        <Link href="/courses">
            <Button variant="ghost" className="cursor-pointer">
                <Image src={activeCourse.imageSrc} alt={activeCourse.title} width={32} height={32} />
            </Button>
        </Link>

        <div className="flex items-center gap-4">
            <div className="relative">
                <Button
                    variant="ghost"
                    className="text-[#ff9d00] font-extrabold text-lg cursor-pointer relative"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <Image src="/streak.svg" alt="Points" height={28} width={28} className="mr-2"/>
                    {streak}
                </Button>
                <div
                  ref={calendarRef}
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 z-50
                  transition-all duration-300 ease-in-out
                  ${showCalendar ? "scale-100" : "scale-0"}`}
                  style={{ transformOrigin: "top center" }}
                >
                  <StreakCalendar />
                </div>
            </div>

            <Link href="/profile">
                <Button variant="ghost" className="text-[#ffcc00] font-extrabold text-lg cursor-pointer">
                    <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2" />
                    {points}
                </Button>
            </Link>
        </div>
    </div>
  );
};
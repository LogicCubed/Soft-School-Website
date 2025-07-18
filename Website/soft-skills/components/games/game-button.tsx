"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

type Props = {
  imageSrc: string;
  label?: string;
  onClick?: () => void;
  locked?: boolean;
};

export const GameButton = ({ imageSrc, label, onClick, locked = true }: Props) => {
  return (
    <button
      onClick={locked ? undefined : onClick}
      disabled={locked}
      className={cn(
        "relative rounded-2xl overflow-hidden border-4 border-sky-400 w-[320px] h-[180px] transition-transform duration-200",
        locked
          ? "opacity-50 filter grayscale hover:scale-100"
          : "cursor-pointer hover:scale-105"
      )}
    >
      <Image
        src={imageSrc}
        alt={label || "Game"}
        fill
        className="object-cover"
      />
      {locked && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full p-1 z-20">
          <Lock className="w-6 h-6 text-white" />
        </div>
      )}
      {label && (
        <div className="absolute bottom-0 left-0 right-0 bg-sky-400 bg-opacity-60 text-white text-center py-2 text-lg font-bold">
          {label}
        </div>
      )}
    </button>
  );
};
'use client'

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  imageSrc: string;
  label?: string;
  locked?: boolean;
  gameId?: string;
  onClick?: () => void;
};

export const GameButton = ({ imageSrc, label, locked = true, gameId, onClick }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (locked) return;
    if (onClick) {
      onClick();
    } else if (gameId) {
      router.push(`/games/${gameId}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={locked && !onClick}
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
      <div className="absolute group top-2 right-2 z-30">
        <Image
          src="/icons/info.png"
          alt="info"
          height={24}
          width={24}
          className="cursor-pointer"
        />
      </div>
      )}

      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-20">
          <Lock className="w-16 h-16 text-white" strokeWidth={3} />
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
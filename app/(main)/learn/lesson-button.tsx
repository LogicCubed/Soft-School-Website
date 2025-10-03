"use client";

import { Check, Crown, Star, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useLoading } from "@/store/loadingStore";
import Image from "next/image";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
}: Props) => {
  const router = useRouter();
  const setLoading = useLoading((s) => s.setLoading);

  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  // Choose icon
  const Icon = locked ? Lock : isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  const handleClick = () => {
    if (locked) return; // Do nothing on locked
    setLoading(true);
    router.push(href);
  };

  const iconSize = 49;
  const iconStyle = {
    width: iconSize,
    height: iconSize,
    minWidth: iconSize,
    minHeight: iconSize,
  };

if (current) {
  return (
    <div className="relative flex flex-col items-center w-[88px] h-[88px]">
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10 pointer-events-none">
        <Image 
          src="/softy-assets/softyhappy.svg" 
          alt="Softy Happy" 
          height={80}
          width={80}
        />
      </div>

      <Button
        variant={locked ? "locked" : "secondary"}
        className="h-[88px] w-[88px] border-2 rounded-none cursor-pointer flex items-center justify-center"
        onClick={handleClick}
      >
        {locked ? (
          <Lock className="text-neutral-400" strokeWidth={2.5} style={iconStyle} />
        ) : (
          <Icon
            strokeWidth={isCompleted ? 3 : 2}
            style={iconStyle}
            className={cn(
              "fill-primary-foreground text-primary-foreground",
              isCompleted && "fill-none"
            )}
          />
        )}
      </Button>
    </div>
  );
}

  return (
    <Button
      variant={locked ? "locked" : "secondary"}
      className={cn(
        "h-[88px] w-[88px] border-2 rounded-none cursor-pointer flex items-center justify-center"
      )}
      onClick={handleClick}
    >
      {locked ? (
        <Lock className="text-[#c1c5ca]" strokeWidth={3} style={iconStyle} />
      ) : (
        <Icon
          strokeWidth={isCompleted ? 3 : 2}
          style={iconStyle}
          className={cn(
            "fill-primary-foreground text-primary-foreground cursor-pointer",
            isCompleted && "fill-none"
          )}
        />
      )}
    </Button>
  );
};
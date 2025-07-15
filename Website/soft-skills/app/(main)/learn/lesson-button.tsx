"use client";

import React, { CSSProperties } from "react";

import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";
import { useLoading } from "@/store/loadingStore";

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
  percentage,
}: Props) => {
  const router = useRouter();
  const setLoading = useLoading((s) => s.setLoading);

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  const handleClick = () => {
    if (locked) return;
    setLoading(true);
    router.push(href);
  };

  const buttonStyles: CSSProperties = {
    pointerEvents: locked ? "none" : "auto",
    right: `${rightPosition}px`,
    marginTop: isFirst && !isCompleted ? 60 : 24,
  };

  // Icons 25% smaller than 65 (previous size)
  const iconSize = 49;

  const iconStyle = {
    width: iconSize,
    height: iconSize,
    minWidth: iconSize,
    minHeight: iconSize,
  };

  // Circular progress bar container larger at 120x120
  const progressWrapperStyle: CSSProperties = {
    width: 120,
    height: 120,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (current) {
    return (
      <div className="relative h-[120px] w-[120px]" style={buttonStyles}>
        <div className="absolute -top-6 left-1/2 px-3 py-2.5 border-2 font-bold uppercase text-sky-500 bg-white rounded-xl animate-bounce tracking-wide z-10 transform -translate-x-1/2">
          Start
          <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
        </div>
        <div style={progressWrapperStyle}>
          <CircularProgressbarWithChildren
            value={Number.isNaN(percentage) ? 0 : percentage}
            styles={{
              path: {
                stroke: "#ff96bf",
              },
              trail: {
                stroke: "#e5e7eb",
              },
            }}
          >
            <Button
              size="rounded"
              variant={locked ? "locked" : "secondary"}
              className="h-[88px] w-[88px] border-b-8 cursor-pointer overflow-visible"
              disabled={locked}
              onClick={handleClick}
            >
              <Icon
                strokeWidth={isCompleted ? 3 : 2} // Thicker for Check, thinner for others
                style={iconStyle}
                className={cn(
                  locked
                    ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                    : "fill-primary-foreground text-primary-foreground",
                  isCompleted && "fill-none"
                )}
              />
            </Button>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    );
  }

  return (
    <Button
      size="rounded"
      variant={locked ? "locked" : "secondary"}
      className={cn(
        "h-[88px] w-[88px] border-b-8 relative overflow-visible",
        isCompleted && "cursor-pointer"
      )}
      disabled={locked}
      onClick={handleClick}
      style={buttonStyles}
    >
      <Icon
        strokeWidth={isCompleted ? 3 : 2}
        style={iconStyle}
        className={cn(
          locked
            ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
            : "fill-primary-foreground text-primary-foreground",
          isCompleted && "fill-none"
        )}
      />
    </Button>
  );
};
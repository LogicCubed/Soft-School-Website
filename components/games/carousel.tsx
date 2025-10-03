"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { GameButton } from "./game-button";

type Game = {
  id: number;
  imageSrc: string;
  label: string;
};

type CarouselProps = {
  title: string;
  games: Game[];
};

export const Carousel = ({ title, games }: CarouselProps) => {
  const visibleCount = 3;
  const [startIndex, setStartIndex] = useState(0);

  const cardWidth = 320;
  const gap = 24;
  const totalCardWidth = cardWidth + gap;
  const containerWidth = totalCardWidth * visibleCount - gap;

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + visibleCount < games.length;

  const handleLeftClick = () => {
    if (canScrollLeft) setStartIndex((prev) => prev - 1);
  };

  const handleRightClick = () => {
    if (canScrollRight) setStartIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="mb-4 text-4xl font-extrabold text-sky-400 text-center">
        {title}
      </h2>

      {/* Carousel container */}
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-4 h-[300px] relative">
          {/* Left arrow */}
          <div className="z-10">
            <Button
              size="rounded"
              variant="secondary"
              className="h-[88px] w-[88px] border-b-8 cursor-pointer"
              disabled={!canScrollLeft}
              onClick={handleLeftClick}
            >
              <ArrowLeft
                strokeWidth={4}
                className={`w-[100px] h-[100px] text-primary-foreground transform scale-125 ${
                  !canScrollLeft ? "opacity-40" : ""
                }`}
              />
            </Button>
          </div>

          {/* Visible window */}
          <div
            className="relative overflow-hidden"
            style={{ width: containerWidth, height: 240 }}
          >
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * totalCardWidth}px)`,
                width: totalCardWidth * games.length,
              }}
            >
              {games.map((game) => (
                <div
                  key={game.id}
                  className="overflow-visible px-1 py-2"
                  style={{ width: cardWidth }}
                >
                  <GameButton imageSrc={game.imageSrc} label={game.label} />
                </div>
              ))}
            </div>

            {/* Left fade */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-full w-16"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
                zIndex: 20,
              }}
            />

            {/* Right fade */}
            <div
              className="pointer-events-none absolute right-0 top-0 h-full w-16"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
                zIndex: 20,
              }}
            />
          </div>

          {/* Right arrow */}
          <div className="z-10">
            <Button
              size="rounded"
              variant="secondary"
              className="h-[88px] w-[88px] border-b-8 cursor-pointer"
              disabled={!canScrollRight}
              onClick={handleRightClick}
            >
              <ArrowRight
                strokeWidth={4}
                className={`w-[100px] h-[100px] text-primary-foreground transform scale-125 ${
                  !canScrollRight ? "opacity-40" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
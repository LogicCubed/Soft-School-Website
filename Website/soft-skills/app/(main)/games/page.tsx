"use client";

import { Carousel } from "@/components/games/carousel";

export default function Page() {
  const games = [
    { id: 1, imageSrc: "/games/game.png", label: "Game 1" },
    { id: 2, imageSrc: "/games/game.png", label: "Game 2" },
    { id: 3, imageSrc: "/games/game.png", label: "Game 3" },
    { id: 4, imageSrc: "/games/game.png", label: "Game 4" },
  ];

  return (
    <>
      <div>
        <Carousel title="Conflict Resolution" games={games} />
      </div>
    </>
  );
}
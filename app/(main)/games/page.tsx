"use client";

import { GameButton } from "@/components/games/game-button";

export default function Page() {
  // TODO: Create database & game upload feature from admin dashboard
  // Temporary Game Display
  const game = {
    id: 1,
    imageSrc: "/games/game.png",
    label: "LOCKED",
    locked: true,
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-10 mt-8">
      <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
        Conflict Resolution Games
      </h1>

      <GameButton
        imageSrc={game.imageSrc}
        label={game.label}
        locked={game.locked}
      />
    </div>
  );
}
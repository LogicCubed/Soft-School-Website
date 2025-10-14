import { PuzzleCard } from "@/components/puzzle-card";

export default function PuzzlesPage() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
        Puzzles
      </h1>
      <div className="flex flex-col items-center space-y-4 mb-20">
        <PuzzleCard
          title="Quicktime"
          description="Select the right responses quickly under pressure."
          href="/puzzles/quicktime"
        />
        <PuzzleCard
          title="Tone Detective"
          description="Identify the speaker’s tone in different conversations."
          href="/puzzles/tone-detective"
        />
        <PuzzleCard
          title="Interrupt or Wait?"
          description="Decide when it’s best to speak up or hold back."
          href="/puzzles/interrupt-or-wait"
        />
      </div>
    </div>
  );
}
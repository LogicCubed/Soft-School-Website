import { PuzzleCard } from "@/app/(main)/puzzles/puzzle-card";
import { StickyWrapper } from "@/components/sticky-wrapper";
import PuzzleStats from "./puzzlestats";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

export default async function PuzzlesPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          points={userProgress.points}
        />
        <PuzzleStats/>
      </StickyWrapper>
      <FeedWrapper>
        <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
          Puzzles
        </h1>
        <div className="w-full border-b-2 border-slate-500 mb-6" />
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
      </FeedWrapper>
    </div>
  );
}
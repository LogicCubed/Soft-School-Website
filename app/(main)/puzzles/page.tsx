import { PuzzleCard } from "@/app/(main)/puzzles/puzzle-card";
import { StickyWrapper } from "@/components/sticky-wrapper";
import PuzzleStats from "./puzzlestats";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { StickyFooter } from "@/components/sticky-footer";
import Head from "next/head";
import { Ear, Hand, Zap } from "lucide-react";

export default async function PuzzlesPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <>
      <Head>
        <title>Puzzles</title>
        <meta
          name="description"
          content="Challenge your soft skills with interactive puzzles. Track your progress and improve communication, decision-making, and problem-solving abilities."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-12 px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            points={userProgress.points}
          />
          <PuzzleStats />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
              Puzzles
            </h1>
            <hr className="w-full border-b-2 border-slate-500 mt-2" />
          </header>

          <main className="flex flex-col items-center space-y-4 mb-20">
            <PuzzleCard
              title="Quicktime"
              description="Select the right responses quickly under pressure."
              href="/puzzles/quicktime"
              icon={<Zap size={64} strokeWidth={2.5} />}
            />
            <PuzzleCard
              title="Tone Detective"
              description="Identify the speaker’s tone in different conversations."
              href="/puzzles/tone-detective"
              icon={<Ear size={64} strokeWidth={2.5} className="shrink-0" />}
            />
            <PuzzleCard
              title="Interrupt or Wait?"
              description="Decide when it’s best to speak up or hold back."
              href="/puzzles/interrupt-or-wait"
              icon={<Hand size={64} strokeWidth={2.5} className="shrink-0" />}
            />
          </main>
        </FeedWrapper>
      </div>
    </>
  );
}
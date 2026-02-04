import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import GameStats from "./gamestats";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { StickyFooter } from "@/components/sticky-footer";
import { GameButton } from "./gamebutton";
import Head from "next/head";

export default async function GamesPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const game = {
    id: 1,
    imageSrc: "/games/game.png",
    label: "LOCKED",
    locked: true,
  };

  return (
    <>
      <Head>
        <title>{userProgress.activeCourse.title} Games</title>
        <meta
          name="description"
          content={`Play ${userProgress.activeCourse.title} games and track your progress. Improve your soft skills through interactive challenges.`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            points={userProgress.points}
          />
          <GameStats />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
              {userProgress.activeCourse.title} Games
            </h1>
            <hr className="w-full border-b-2 border-slate-500 mt-2" />
          </header>

          <main className="flex justify-center w-full gap-4">
            {/*TODO: Link game locked status to user progress*/}
            <GameButton
              imageSrc="/games/game.png"
              label="PLAY"
              locked={false}
              gameId="gameA"
            />
            <GameButton
              imageSrc={game.imageSrc}
              label={game.label}
              locked={game.locked}
            />
          </main>
        </FeedWrapper>
      </div>
    </>
  );
}
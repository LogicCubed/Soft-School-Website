import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import GameStats from "./gamestats";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { StickyFooter } from "@/components/sticky-footer";
import { GameButton } from "./gamebutton";

export default async function GamesPage() {
  const userProgress = await getUserProgress();
  
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  // TODO: Create database & game upload feature from admin dashboard
  // Temporary Game Display
  const game = {
    id: 1,
    imageSrc: "/games/game.png",
    label: "LOCKED",
    locked: true,
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          points={userProgress.points}
        />
        <GameStats/>
        <StickyFooter/>
      </StickyWrapper>
      <FeedWrapper>
        <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
          {userProgress.activeCourse.title} Games
        </h1>
        <div className="w-full border-b-2 border-slate-500 mb-6" />
        <div className="flex justify-center w-full gap-4">
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
        </div>
      </FeedWrapper>
    </div>
  );
}
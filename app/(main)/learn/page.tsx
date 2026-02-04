import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";

import { Header } from "../../../components/learn-components/header";
import { Unit } from "../../../components/learn-components/unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import { BackToTop } from "@/components/learn-components/back-to-top";
import Leaderboard from "@/components/learn-components/leaderboard";
import Friends from "@/components/learn-components/friends";
import { UnitVisual } from "../../../components/learn-components/unit-visual";
import AIHelper from "@/components/widgets/ai-helper";
import { StickyFooter } from "@/components/sticky-footer";
import Head from "next/head";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <>
      <Head>
        <title>{userProgress.activeCourse.title}</title>
        <meta
          name="description"
          content={`Learn ${userProgress.activeCourse.title} with interactive lessons and track your progress. Access units, lessons, and soft skills exercises.`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            points={userProgress.points}
          />
          <AIHelper />
          <Friends />
          <Leaderboard />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <header>
            <Header title={userProgress.activeCourse.title} />
          </header>

          <main>
            {units.map((unit) => (
              <section key={unit.id} className="mb-10 relative">
                {/*TODO: Make UnitVisual customizable & responsive*/}
                <aside className="absolute left-10 hidden sm:block top-[410px]">
                  <UnitVisual imageSrc="/hux_podium.svg" alt={unit.title} />
                </aside>

                <Unit
                  id={unit.id}
                  order={unit.order}
                  description={unit.description}
                  title={unit.title}
                  lessons={unit.lessons}
                  activeLesson={
                    courseProgress.activeLesson as typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    } | undefined
                  }
                  activeLessonPercentage={lessonPercentage}
                />
              </section>
            ))}
          </main>

          <BackToTop />
        </FeedWrapper>
      </div>
    </>
  );
};

export default LearnPage;
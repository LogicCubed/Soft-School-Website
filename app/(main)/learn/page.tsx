import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import Link from "next/link";
import { BackToTop } from "@/components/ui/back-to-top";
import Leaderboard from "@/app/(main)/learn/leaderboard";
import Friends from "@/app/(main)/learn/friends";
import { UnitVisual } from "./unit-visual";
import AIHelper from "@/components/ai-helper";

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();

    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage
    ] = await Promise.all([
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
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    points={userProgress.points}
                />
                <AIHelper/>
                <Friends/>
                <Leaderboard/>
                <div className="mt-4 w-full flex flex-col items-center">
                    <div className="flex flex-wrap gap-x-6 text-sm font-bold text-neutral-300">
                        <Link href="/about-us" className="hover:text-sky-400 transition-colors">About Us</Link>
                        <Link href="/course-catalogue" className="hover:text-sky-400 transition-colors">Courses</Link>
                        <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-sky-400 transition-colors">Privacy</Link>
                    </div>
                    <p className="text-xs font-bold text-neutral-400 mt-4 text-center">
                        © {new Date().getFullYear()} Soft School. All rights reserved.
                    </p>
                </div>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <div className="absolute left-8 top-[410px]">
                            <UnitVisual 
                                imageSrc={`/characters/hux.svg`} 
                                alt={unit.title} 
                            />
                        </div>
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson as typeof
                            lessons.$inferSelect & {
                                unit: typeof unitsSchema.$inferSelect;
                            } | undefined}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
                <BackToTop/>
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";

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
                <div className="mt-1 w-full rounded-xl bg-sky-500 p-5 text-white flex items-center justify-between">
                    <div className="space-y-2.5">
                        <h3 className="text-2xl font-bold">
                            Games
                        </h3>
                        <p className="text-lg">
                            Try out some Games!
                        </p>
                    </div>
                    <Link href="/lesson">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="hidden xl:flex border-2 border-b-4 active:border-b-2 cursor-pointer"
                            >
                                <Gamepad2 className="mr-2"/>
                                PLAY
                            </Button>
                    </Link>
                </div>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
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
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;
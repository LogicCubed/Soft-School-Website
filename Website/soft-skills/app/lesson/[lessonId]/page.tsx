import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        lessonId: string;
    };
};

export default async function LessonIdPage({ params }: Props) {
    const { lessonId } = await params;
    const lessonIdNumber = Number(lessonId);

    if (isNaN(lessonIdNumber)) {
        redirect("/learn");
    }

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        getLesson(lessonIdNumber),
        getUserProgress(),
    ]);

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialPercentage={initialPercentage}
        />
    );
};
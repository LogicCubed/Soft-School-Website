import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";
import { challengeOptions, challenges } from "@/db/schema";

type Props = {
  params: Promise<{
    lessonId: string;
  }>;
};

export default async function LessonIdPage({ params }: Props) {
  const { lessonId } = await params;
  const lessonIdNumber = Number(lessonId);

  if (isNaN(lessonIdNumber)) {
    redirect("/learn");
  }

  const [lesson, userProgress] = await Promise.all([
    getLesson(lessonIdNumber),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

type CleanChallenge = Omit<typeof challenges.$inferSelect, "videoUrl"> & {
  completed: boolean;
  challengeOptions: typeof challengeOptions.$inferSelect[];
  videoUrl?: string;
};

const cleanedChallenges: CleanChallenge[] = lesson.challenges.map(({ challengeProgress, videoUrl, ...rest }) => ({
  ...rest,
  videoUrl: videoUrl === null ? undefined : videoUrl,
  completed: challengeProgress.some((p) => p.completed),
  challengeOptions: rest.challengeOptions,
}));

return (
  <Quiz
    initialLessonId={lesson.id}
    initialLessonChallenges={cleanedChallenges}
    initialPercentage={initialPercentage}
  />
);
}
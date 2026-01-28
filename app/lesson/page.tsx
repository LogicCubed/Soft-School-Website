import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../../components/lesson-components/quiz";

type ChallengeType = Omit<
  typeof import("@/db/schema").challenges.$inferSelect,
  "videoUrl"
> & {
  completed: boolean;
  challengeOptions: typeof import("@/db/schema").challengeOptions.$inferSelect[];
  videoUrl?: string;
};

const LessonPage = async () => {
  const [lesson, userProgress] = await Promise.all([getLesson(), getUserProgress()]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  // Clean videoUrl: convert null to undefined to satisfy Quiz props
  const cleanedChallenges: ChallengeType[] = lesson.challenges.map(
    ({ challengeProgress: _, videoUrl, ...rest }) => ({
      ...rest,
      videoUrl: videoUrl === null ? undefined : videoUrl,
      completed: _.some((p) => p.completed), // keep completed flag or from original
      challengeOptions: rest.challengeOptions,
    })
  );

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={cleanedChallenges}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonPage;
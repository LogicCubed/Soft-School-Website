import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";

export const MobileHeader = async () => {
  const progress = await getUserProgress();

  if (!progress || !progress.activeCourse) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-2">
      <UserProgress
        activeCourse={progress.activeCourse}
        points={progress.points}
      />
    </header>
  );
};
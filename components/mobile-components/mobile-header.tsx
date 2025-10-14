import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";

export const MobileHeader = async () => {
  const progress = await getUserProgress();

  if (!progress || !progress.activeCourse) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#231e31] border-b border-slate-500 px-4 py-2 flex items-center">
      <div className="flex-1">
        <UserProgress
          activeCourse={progress.activeCourse}
          points={progress.points}
        />
      </div>
    </header>
  );
};
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { MobileHeaderItem } from "./mobile-header-item";

export const MobileHeader = async () => {
  const progress = await getUserProgress();

  if (!progress || !progress.activeCourse) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-2 flex items-center">
      {/* Admin button on the left */}
      <div className="mr-2">
        <MobileHeaderItem
          iconSrc="/admin.svg"
          href="/admin/dashboard"
          label="Admin"
        />
      </div>

      {/* UserProgress takes remaining space */}
      <div className="flex-1">
        <UserProgress
          activeCourse={progress.activeCourse}
          points={progress.points}
        />
      </div>
    </header>
  );
};
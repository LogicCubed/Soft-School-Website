import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { startOfDay, isSameDay, isYesterday, formatISO } from "date-fns";
import db from "@/db/drizzle";

export const updateLastActivity = async (userId: string) => {
  const [user] = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  if (!user) {
    return;
  }

  const now = new Date();
  const today = startOfDay(now);

  const last = user.lastActivityDate ? startOfDay(new Date(user.lastActivityDate)) : null;
  let currentStreak = user.currentStreak ?? 0;
  let longestStreak = user.longestStreak ?? 0;

  // If last activity is today, do nothing
  if (last && isSameDay(today, last)) {
    return;
  }

  // If last activity was yesterday, increment streak by 1
  if (last && isYesterday(last)) {
    currentStreak += 1;
  } else {
    // Otherwise reset streak to 1
    currentStreak = 1;
  }

  // Update longest streak if current is higher
  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  // Store only the date part (YYYY-MM-DD) to avoid time zone issues
  const todayDateOnly = formatISO(today, { representation: "date" });

  await db
    .update(userProgress)
    .set({
      lastActivityDate: todayDateOnly,
      currentStreak,
      longestStreak,
    })
    .where(eq(userProgress.userId, userId));
};

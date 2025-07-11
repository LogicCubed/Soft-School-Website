import "dotenv/config";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";

async function resetStreaks() {
  const result = await db
    .update(userProgress)
    .set({
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
    })
    .returning();

  console.log("Reset streaks for users:", result.length);
}

resetStreaks()
  .then(() => {
    console.log("Streaks reset complete.");
    process.exit(0);
  })
  .catch((e) => {
    console.error("Error resetting streaks:", e);
    process.exit(1);
  });
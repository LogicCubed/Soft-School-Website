import "dotenv/config";
import db from "../db/drizzle";
import { userProgress } from "../db/schema";
import { eq } from "drizzle-orm";

async function setStreaks() {
  const userId = "user_2w6RUjcDYmfnDcqfGcsmwEjBw3G";
  const currentStreak = 7;
  const longestStreak = 15;
  const lastActivityDate = new Date().toISOString();

  await db.update(userProgress)
    .set({ currentStreak, longestStreak, lastActivityDate })
    .where(eq(userProgress.userId, userId));
}

setStreaks().catch(console.error).finally(() => process.exit());
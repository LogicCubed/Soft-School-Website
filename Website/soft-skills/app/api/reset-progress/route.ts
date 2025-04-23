
import db from "@/db/drizzle";
import { challengeProgress, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST() {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

    await db.delete(challengeProgress).where(eq(challengeProgress.userId, userId));
    await db.delete(userProgress).where(eq(userProgress.userId, userId));

  return new Response("Progress reset", { status: 200 });
}

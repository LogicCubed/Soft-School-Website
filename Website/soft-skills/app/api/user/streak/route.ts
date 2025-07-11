import { userProgress } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/db/drizzle";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [user] = await db
    .select({ currentStreak: userProgress.currentStreak })
    .from(userProgress)
    .where(eq(userProgress.userId, userId))
    .limit(1);

  return NextResponse.json({ currentStreak: user?.currentStreak ?? 0 });
}
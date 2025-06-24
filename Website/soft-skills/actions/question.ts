"use server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function createQuestion(lessonId: number) {
  const maxOrderResult = await db
    .select({
      maxOrder: sql<number>`MAX("order")`,
    })
    .from(challenges)
    .where(eq(challenges.lessonId, lessonId))
    .limit(1);

  const maxOrder = maxOrderResult[0]?.maxOrder ?? 0;

  const [newQuestion] = await db
    .insert(challenges)
    .values({
      lessonId,
      type: "SELECT",
      question: "Untitled question",
      order: maxOrder + 1,
    })
    .returning();

  return newQuestion;
}
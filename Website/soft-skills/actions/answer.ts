"use server";

import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createAnswer(
  challengeId: number,
  question: string,
  correct: boolean = false,
  explanation: string = ""
) {
  const [newAnswer] = await db
    .insert(challengeOptions)
    .values({
      challengeId,
      text: question,
      correct,
      explanation,
    })
    .returning();

  return newAnswer;
}

export async function deleteAnswer(answerId: number) {
  await db.delete(challengeOptions).where(eq(challengeOptions.id, answerId));
}

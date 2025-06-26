"use server";

import db from "@/db/drizzle";
import { challengeOptions, challenges } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// Function to Create a new Question
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
      question: "Question",
      order: maxOrder + 1,
    })
    .returning();

  return newQuestion;
}

// Function to delete a Question
export async function deleteQuestion(questionId: number) {
  await db.delete(challenges).where(eq(challenges.id, questionId));
}

// Function to update a Question's Type
export async function updateQuestionType(questionId: number, newType: typeof challenges.type.enumValues[number]) {
  await db
    .update(challenges)
    .set({ type: newType })
    .where(eq(challenges.id, questionId));
}

// Function to update a Question's Text
export async function updateQuestionText(questionId: number, newText: string) {
  await db
    .update(challenges)
    .set({ question: newText })
    .where(eq(challenges.id, questionId));
}

// Function to update Question Options
export async function updateOptionText(optionId: number, newText: string) {
  await db
    .update(challengeOptions)
    .set({ text: newText })
    .where(eq(challengeOptions.id, optionId));
}
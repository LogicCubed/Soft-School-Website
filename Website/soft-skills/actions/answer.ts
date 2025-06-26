"use server";

import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

// Function to Create a new Answer
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

// Function to delete an Answer
export async function deleteAnswer(answerId: number) {
  await db.delete(challengeOptions).where(eq(challengeOptions.id, answerId));
}

// Function to update Explanations
export async function updateOptionExplanation(answerId: number, newExplanation: string) {
  await db
    .update(challengeOptions)
    .set({ explanation: newExplanation })
    .where(eq(challengeOptions.id, answerId));
}

// Function to set Correct Answer
export async function updateCorrectAnswer(optionId: number, challengeId: number) {
  // First, set all options for this challenge to incorrect
  await db
    .update(challengeOptions)
    .set({ correct: false })
    .where(eq(challengeOptions.challengeId, challengeId));

  // Then, mark the selected option as correct
  await db
    .update(challengeOptions)
    .set({ correct: true })
    .where(eq(challengeOptions.id, optionId));
}
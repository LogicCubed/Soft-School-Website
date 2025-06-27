"use server";

import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export type ChallengeOption = {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
  explanation: string | null;
};

// Create a new Answer and return the inserted row
export async function createAnswer(
  challengeId: number,
  question: string,
  correct: boolean = false,
  explanation: string = ""
): Promise<ChallengeOption> {
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

// Delete an Answer by ID
export async function deleteAnswer(answerId: number): Promise<void> {
  await db.delete(challengeOptions).where(eq(challengeOptions.id, answerId));
}

// Update the explanation text of an option
export async function updateOptionExplanation(
  answerId: number,
  newExplanation: string
): Promise<void> {
  await db
    .update(challengeOptions)
    .set({ explanation: newExplanation })
    .where(eq(challengeOptions.id, answerId));
}

// Set the correct answer for a challenge (only one correct at a time)
export async function updateCorrectAnswer(
  optionId: number,
  challengeId: number
): Promise<void> {
  // Set all options for this challenge to incorrect
  await db
    .update(challengeOptions)
    .set({ correct: false })
    .where(eq(challengeOptions.challengeId, challengeId));

  // Mark the chosen option as correct
  await db
    .update(challengeOptions)
    .set({ correct: true })
    .where(eq(challengeOptions.id, optionId));
}

// Update the text of an option
export async function updateOptionText(
  answerId: number,
  newText: string
): Promise<void> {
  await db
    .update(challengeOptions)
    .set({ text: newText })
    .where(eq(challengeOptions.id, answerId));
}
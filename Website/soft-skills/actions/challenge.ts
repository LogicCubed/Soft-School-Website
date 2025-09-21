"use server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateChallengeVideo(challengeId: number, videoUrl: string) {
  try {
    const [updatedChallenge] = await db
      .update(challenges)
      .set({ videoUrl })
      .where(eq(challenges.id, challengeId))
      .returning();

    return {
      success: true,
      data: updatedChallenge,
    };
  } catch (error) {
    console.error("Error updating challenge video:", error);
    return {
      success: false,
      error: "Failed to update challenge video",
    };
  }
}
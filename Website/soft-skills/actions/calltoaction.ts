"use server";

import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateCallToAction(challengeId: number, newCallToAction: string) {
  await db
    .update(challenges)
    .set({ callToAction: newCallToAction })
    .where(eq(challenges.id, challengeId));
}

"use server";

import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { eq } from "drizzle-orm";

type CreateLessonParams = {
  unitId: number;
  title: string;
};

export const createLesson = async ({
  unitId,
  title,
}: {
  unitId: number;
  title?: string;
}) => {
  // Get the number of existing lessons in this unit to determine the order
  const existingLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.unitId, unitId));

  const order = existingLessons.length + 1;

  const finalTitle = title?.trim() || `Lesson ${order}`;

  await db.insert(lessons).values({
    unitId,
    order,
    title: finalTitle,
  });
};

export const deleteLesson = async (lessonId: number) => {
  await db.delete(lessons).where(eq(lessons.id, lessonId));
};
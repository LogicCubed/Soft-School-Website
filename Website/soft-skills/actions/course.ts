"use server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createCourse({ title, imageSrc }: { title: string, imageSrc: string }) {
    const result = await db
        .insert(courses)
        .values({ title, imageSrc })
        .returning();
  return result[0];
}

export async function deleteCourse(courseId: number) {
  await db.delete(courses).where(eq(courses.id, courseId));
}
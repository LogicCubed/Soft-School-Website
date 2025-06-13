"use server";

import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

type CreateUnitInput = {
  title: string;
  description: string;
  order: number;
  courseId: number;
};

export const createUnit = async ({
  title,
  description,
  courseId,
}: {
  title: string;
  description: string;
  courseId: number;
}) => {
  const maxOrderResult = await db
    .select({
      maxOrder: sql`MAX(${units.order})`,
    })
    .from(units)
    .where(eq(units.courseId, courseId))
    .limit(1);

  const maxOrder = Number(maxOrderResult[0]?.maxOrder) || 0;

  const result = await db
    .insert(units)
    .values({
      title,
      description,
      courseId,
      order: maxOrder + 1,
    })
    .returning();

  return result[0];
};

export const deleteUnit = async (unitId: number) => {
  await db.delete(units).where(eq(units.id, unitId));
};
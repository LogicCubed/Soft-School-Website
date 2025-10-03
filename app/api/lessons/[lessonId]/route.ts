import db from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const parseId = (lessonId: string) => {
  const id = Number(lessonId);
  if (isNaN(id)) return null;
  return id;
};

const checkAdmin = () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  return null;
};

export async function GET(
  _req: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(lessonId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, id),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(lessonId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set(body)
    .where(eq(lessons.id, id))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(lessonId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, id))
    .returning();

  return NextResponse.json(data[0]);
}
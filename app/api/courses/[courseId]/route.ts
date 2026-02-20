import { NextResponse } from "next/server";
import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;

  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const id = Number(courseId);
  if (isNaN(id)) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, id),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;

  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const id = Number(courseId);
  if (isNaN(id)) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set(body)
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;

  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const id = Number(courseId);
  if (isNaN(id)) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, id))
    .returning();

  return NextResponse.json(data[0]);
}
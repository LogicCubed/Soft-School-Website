import db from "@/db/drizzle";
import { challenges } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = { params: Promise<{ challengeId: string }> };

const parseId = (challengeId: string) => {
  const id = Number(challengeId);
  if (isNaN(id)) return null;
  return id;
};

const checkAdmin = () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  return null;
};

export const GET = async (_req: Request, { params }: Params) => {
  const { challengeId } = await params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(challengeId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, id),
  });

  return NextResponse.json(data);
};

export const PUT = async (req: Request, { params }: Params) => {
  const { challengeId } = await params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(challengeId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const body = await req.json();
  const data = await db
    .update(challenges)
    .set(body)
    .where(eq(challenges.id, id))
    .returning();

  return NextResponse.json(data[0]);
};

export const DELETE = async (_req: Request, { params }: Params) => {
  const { challengeId } = await params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(challengeId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, id))
    .returning();

  return NextResponse.json(data[0]);
};
import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const parseId = (unitId: string) => {
  const id = Number(unitId);
  return isNaN(id) ? null : id;
};

const checkAdmin = () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 403 });
  }
  return null;
};

export async function GET(
  _req: Request,
  context: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(unitId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, id),
  });

  return NextResponse.json(data);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(unitId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const body = await req.json();
  const [data] = await db
    .update(units)
    .set(body)
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await context.params;

  const authError = checkAdmin();
  if (authError) return authError;

  const id = parseId(unitId);
  if (!id) {
    return new NextResponse("Invalid ID", { status: 400 });
  }

  const [data] = await db
    .delete(units)
    .where(eq(units.id, id))
    .returning();

  return NextResponse.json(data);
}
import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: { challengeOptionsId: string } }, // Fixed parameter name
) => {
    const id = Number(params.challengeOptionsId); // Corrected variable name
    if (isNaN(id)) {
        return new NextResponse("Invalid ID", { status: 400 });
    }

    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id, id),
    });

    return NextResponse.json(data);
};

export const PUT = async (
    req: Request,
    { params }: { params: { challengeOptionsId: string } }, // Fixed parameter name
) => {
    const id = Number(params.challengeOptionsId); // Corrected variable name
    if (isNaN(id)) {
        return new NextResponse("Invalid ID", { status: 400 });
    }

    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(challengeOptions).set({
        ...body,
    }).where(eq(challengeOptions.id, id)).returning();

    return NextResponse.json(data[0]);
};

export const DELETE = async (
    req: Request,
    { params }: { params: { challengeOptionsId: string } }, // Fixed parameter name
) => {
    const id = Number(params.challengeOptionsId); // Corrected variable name
    if (isNaN(id)) {
        return new NextResponse("Invalid ID", { status: 400 });
    }

    if (!isAdmin()) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(challengeOptions)
        .where(eq(challengeOptions.id, id)).returning();

    return NextResponse.json(data[0]);
};
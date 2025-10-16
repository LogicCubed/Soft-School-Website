import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { courses } from "@/db/schema";
import { getUserProgress } from "@/db/queries";
import { isAdmin } from "@/lib/admin";
import { useState } from "react";
import { UserProgressClient } from "./user-progress-client";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    points: number;
}

export const UserProgress = async ({
    activeCourse,
}: Props) => {
    const progress = await getUserProgress();
    const admin = await isAdmin();

    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            {admin && (
                <Link href="/admin/dashboard">
                    <Button variant="ghost" className="cursor-pointer">
                        <Image src="/admin.svg" alt="Admin" height={28} width={28} className="mr-2" />
                    </Button>
                </Link>
            )}

            <UserProgressClient
                activeCourse={progress?.activeCourse!}
                points={progress?.points || 0}
                streak={3}
            />
        </div>
    );
};
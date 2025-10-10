import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { courses } from "@/db/schema";
import { getUserProgress } from "@/db/queries";
import { isAdmin } from "@/lib/admin";

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
            <Link href="/courses">
                <Button variant="ghost" className="cursor-pointer">
                    <Image
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border border-transparent"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-[#ff9d00] font-extrabold cursor-pointer">
                    <Image src="/streak.svg" alt="Points" height={28} width={28} className="mr-2"/>
                    3
                </Button>
            </Link>
            <Link href="/profile">
                <Button variant="ghost" className="text-[#ffcc00] font-extrabold cursor-pointer">
                    <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2"/>
                    {progress?.points}
                </Button>
            </Link>
        </div>
    );
};
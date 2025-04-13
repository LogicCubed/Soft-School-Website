import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { courses, userProgress } from "@/db/schema";
import { getUserProgress } from "@/db/queries";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    points: number;
}

export const UserProgress = async ({
    activeCourse,
    points,
}: Props) => {
    const progress = await getUserProgress();

    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
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
                <Button variant="ghost" className="text-[#ffcc00] cursor-pointer">
                    <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2"/>
                    {progress?.points}
                </Button>
            </Link>
        </div>
    );
};
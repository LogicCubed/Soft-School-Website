import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
    activeCourse: { imageSrc: string; title: string }; // TODO: Replace with DB types
}

export const UserProgress = ({
    activeCourse
}: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border border-transparent"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
        </div>
    );
};
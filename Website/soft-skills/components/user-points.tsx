import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getUserProgress } from "@/db/queries";

type Props = {
    points: number;
}

export const UserPoints = async ({
}: Props) => {
    const progress = await getUserProgress();

    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/shop" className="ml-auto mb-5 mr-3">
                <Button variant="ghost" className="text-[#ffcc00] cursor-pointer">
                    <Image src="/points.svg" alt="Points" height={28} width={28} className="mr-2"/>
                    {progress?.points}
                </Button>
            </Link>
        </div>
    );
};
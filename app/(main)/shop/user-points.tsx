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
                <Button variant="ghost" size="lg" className="text-[#ffcc00] text-3xl cursor-pointer">
                    <Image src="/icons/points.svg" alt="Points" height={40} width={40}/>
                    {progress?.points}
                </Button>
            </Link>
        </div>
    );
};
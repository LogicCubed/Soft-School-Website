"use client";

import Image from "next/image";

type Props = {
    icon: string;
    name: string;
};

export const Badges = ({
    icon,
    name,
}: Props) => {

    return (
        <div className="border-2 rounded-xl border-b-4 p-2 ml-4 mb-6 w-[1000px] flex cursor-pointer">
            <div className="p-2 flex items-center">
                <Image
                    src="/softy-assets/softyhappy.svg"
                    alt="Test Badge"
                    height={60}
                    width={60}
                />
            </div>
            <div className="flex flex-col items-start ml-4">
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Wildfire
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Reach a 5 Day Streak
                </p>
            </div>
        </div>
    );
}
"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";

type Props = {
    icon: string;
    name: string;
};

export const Badge = ({}: Props) => {
    return (
        <div className="border-2 rounded-xl border-b-6 border-[#298e76] bg-[#3dbd9f] px-6 mb-6 w-full max-w-[600px] flex flex-col sm:flex-row items-center sm:items-center cursor-pointer">
            <div className="flex-shrink-0 flex items-center">
                <Image
                    src="/softy-assets/softyhappy.svg"
                    alt="Test Badge"
                    height={100}
                    width={100}
                />
            </div>
            <div className="flex flex-col items-center sm:items-start ml-0 sm:ml-6 flex-grow w-full">
                <h1 className="text-center sm:text-left font-extrabold text-white text-2xl sm:text-4xl my-4 sm:my-6">
                    Test Badge
                </h1>
                <Progress
                    className="w-full h-5 max-w-full"
                    value={20}
                />
                <p className="text-center sm:text-left font-extrabold text-white text-lg mt-4 mb-4 sm:mt-6 sm:mb-6">
                    Reach a 5 Day Streak
                </p>
            </div>
        </div>
    );
}
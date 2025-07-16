import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
    value: number;
    accuracy: number;
    time: string;
};

export const ResultCard = ({ value, accuracy, time }: Props) => {

    return (
        <div className="flex justify-center items-center gap-4 w-full">
            <div className="rounded-2xl border-4 w-[250px] max-w-xs bg-[#ffcc00] border-[#ffcc00]">
                <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-sm bg-[#ffcc00]">
                    Total XP
                </div>
                <div className={cn(
                    "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-[#ffcc00]"
                )}>
                    <Image
                        alt="Icon"
                        src="/points.svg"
                        height={30}
                        width={30}
                        className="mr-1.5"
                    />
                    {value}
                </div>
            </div>
            <div className="rounded-2xl border-4 w-[250px] max-w-xs bg-[#1beb00] border-[#1beb00]">
                <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-sm bg-[#1beb00]">
                    Accuracy
                </div>
                <div className={cn(
                    "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-[#1beb00]"
                )}>
                    <Image
                        alt="Icon"
                        src="/accuracy.svg"
                        height={30}
                        width={30}
                        className="mr-1.5"
                    />
                    {accuracy}%
                </div>
            </div>
            <div className="rounded-2xl border-4 w-[250px] max-w-xs bg-sky-500 border-sky-500">
                <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-sm bg-sky-500">
                    Time
                </div>
                <div className={cn(
                    "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-sky-400"
                )}>
                    <Image
                        alt="Icon"
                        src="/time.svg"
                        height={30}
                        width={30}
                        className="mr-1.5"
                    />
                    {time}
                </div>
            </div>
        </div>
    );
};
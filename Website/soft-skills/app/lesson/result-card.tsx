import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
    value: number;
};

export const ResultCard = ({ value }: Props) => {
    const imageSrc = "/points.svg";

    return (
        <div className="rounded-2xl border-4 w-full bg-[#ffcc00] border-[#ffcc00]">
            <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-sm bg-[#ffcc00]">
                Total XP
            </div>
            <div className={cn(
                "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg text-[#ffcc00]"
            )}>
                <Image
                    alt="Icon"
                    src={imageSrc}
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
        
    );
};
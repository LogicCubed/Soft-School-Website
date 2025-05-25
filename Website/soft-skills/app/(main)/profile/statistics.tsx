"use client";

import Image from "next/image";

type Props = {
    icon: string;
    stat: string;
    caption: string;
};

export const Statistics = ({
}: Props) => {

    return (
        <div>
            <div className="border-2 rounded-xl border-b-4 p-2 ml-4 mb-6 w-[250px] h-[75px] flex items-center">
                <div className="mr-5">
                    <Image
                        src="/points.svg"
                        alt="Points"
                        height={40}
                        width={40}
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-muted-foreground font-bold text-center text-lg leading-none mb-2">
                        0
                    </p>
                    <p className="text-muted-foreground text-center text-sm font-bold leading-none">
                        Total XP
                    </p>
                </div>
            </div>
        </div>
    );
}
"use client";

import Image from "next/image";

type Props = {
    icon: string;
    stat: string;
    caption: string;
};

export const Statistic = ({
    icon,
    stat,
    caption,
}: Props) => {

    return (
        <div>
            <div className="border-2 rounded-xl border-b-6 border-slate-400 bg-slate-200 p-2 mr-4 mb-6 w-62.5 h-18.75 flex items-center">
                <div className="mr-5">
                    <Image
                        src={icon}
                        alt={caption}
                        height={40}
                        width={40}
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-muted-foreground font-bold text-center text-lg leading-none mb-2">
                        {stat}
                    </p>
                    <p className="text-muted-foreground text-center text-sm font-bold leading-none">
                        {caption}
                    </p>
                </div>
            </div>
        </div>
    );
}
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition } from "react";

type ItemProps = {
  points: number;
  name: string;
  cost: number;
  imageSrc: string;
  description: string;
};

export const Item = ({ points, name, cost, imageSrc, description }: ItemProps) => {
    const [pending, startTransition] = useTransition();

    const onPurchase = () => {
        startTransition(() => {
        // TODO: Purchase logic here
        });
    };

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2 border-slate-500">
                <Image
                    src={imageSrc}
                    alt="Test Item"
                    height={60}
                    width={60}
                />
                <div className="flex-1 flex items-center gap-x-4">
                    <p className="text-white-700 text-xl font-bold">
                        {name}
                    </p>
                    <div className="relative group">
                        <Image
                            src="/icons/info.png"
                            alt="info"
                            height={24}
                            width={24}
                            className="cursor-pointer"
                        />
                        <div className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2
                                        border-4 bg-slate-700 border-slate-500 text-white text-left font-semibold
                                        px-4 py-2 z-50 rounded opacity-0 group-hover:opacity-100 transition-opacity
                                        min-w-[160px] max-w-[300px] break-words">
                            <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 z-0 border-t-12 border-b-12 border-r-12 border-t-transparent border-b-transparent border-r-slate-500" />
                            {description}
                        </div>
                    </div>
                </div>
                <Button
                    onClick={onPurchase}
                    disabled={
                        pending
                        || points < cost}
                    className="cursor-pointer text-white text-xl bg-green-500 border-green-800 hover:bg-green-400"
                >
                    <div className="flex items-center">
                        <Image
                            src="/points.svg"
                            alt="Points"
                            height={20}
                            width={20}
                        />
                        <p className="ml-2">
                            {cost} BUY
                        </p>
                    </div>
                </Button>
            </div>
        </ul>
    );
}
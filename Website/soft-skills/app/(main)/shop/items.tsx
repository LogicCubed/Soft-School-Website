"use client";

import { Button } from "@/components/ui/button";
import { TEST_ITEM_COST } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";

type Props = {
    points: number;
};

export const Items = ({
    points,
}: Props) => {
    const [pending, startTransition] = useTransition();

    const onTestItemPurchase = () => {
        startTransition(() => {
            onTestItemPurchase();
        });
    }

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image
                    src="/logo.png"
                    alt="Test Item"
                    height={60}
                    width={60}
                />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Test Item
                    </p>
                </div>
                <Button
                    onClick={onTestItemPurchase}
                    disabled={
                        pending
                        || points < TEST_ITEM_COST}
                    className="cursor-pointer"
                >
                    <div className="flex items-center">
                        <Image
                            src="/points.svg"
                            alt="Points"
                            height={20}
                            width={20}
                        />
                        <p>
                            {TEST_ITEM_COST}
                        </p>
                    </div>
                </Button>
            </div>
        </ul>
    );
}
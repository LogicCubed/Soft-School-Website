import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    explanation: string;
    status?: "correct" | "wrong" | "none",
};

export const Explanation = ({
    explanation,
    status,
}: Props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (status !== "none") {
            setIsVisible(true);
        }
    }, [status]);

    const imageSrc = status === "correct" 
        ? "/softy-assets/softyhappy.svg"
        : status === "wrong" 
        ? "/softy-assets/softysad.svg"
        : "/softy-assets/softyhappy.svg";
        
    return (
        <div className="fixed left-0 top-[41%] -translate-y-1/2 z-50 flex flex-col items-center">
            <Image
                src={imageSrc}
                alt="logo"
                height={128}
                width={128}
                className={cn(
                    "hidden lg:block mb-4",
                    "transition-opacity duration-500 ease-in-out",
                    isVisible ? "opacity-100" : "opacity-0"
                )}
            />
            <div className={cn(
                "border-2 rounded-xl border-b-4 p-4 ml-4 max-w-[400px]",
                status === "correct" &&
                    "border-green-300 bg-green-100 hover:bg-green-100 text-green-500",
                status === "wrong" &&
                    "border-rose-300 bg-rose-100 hover:bg-rose-100 text-rose-500",
                "transition-opacity duration-500 ease-in-out",
                isVisible ? "opacity-100" : "opacity-0",
                )}>
                <div>
                    {explanation}
                </div>
            </div>
        </div>
    );
};
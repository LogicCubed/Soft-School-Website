import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    return (
        <div className="sticky top-0 bg-[#231e31] pb-3 lg:pt-[28px] flex items-center justify-center border-b-2 border-slate-500 mb-5 text-white lg:z-50">
            
            <Link href="/courses" className="absolute left-4">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                    <ArrowLeft className="h-12 w-12 stroke-4 text-neutral-400"/>
                </Button>
            </Link>

            <h1 className="text-3xl font-extrabold text-sky-400 text-center">
                {title}
            </h1>
        </div>
    );
};
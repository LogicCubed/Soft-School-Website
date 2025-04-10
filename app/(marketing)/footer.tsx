import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                {/*
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/speaking.svg" alt="Speaking" height={32} width={40} className="mr-4 rounded-md"/>
                    Speaking
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/teamwork.svg" alt="Teamwork" height={32} width={40} className="mr-4 rounded-md"/>
                    Teamwork
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/problemsolving.svg" alt="Problem Solving" height={32} width={40} className="mr-4 rounded-md"/>
                    Problem Solving
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/conflictresolution.svg" alt="Conflict Resolution" height={32} width={40} className="mr-4 rounded-md"/>
                    Conflict Resolution
                </Button>
                */}
            </div>
        </footer>
    );
};

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Middle = () => {
    return (
        <footer className="hidden lg:block h-20 w-screen border-t-2 border-b-2 p-2 mt-20">
            <div className="max-w-5xl mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost">
                    <Image src="/courses/speaking.svg" alt="Speaking" height={32} width={40} className="mr-4 rounded-md"/>
                    Speaking
                </Button>
                <Button size="lg" variant="ghost">
                    <Image src="/courses/teamwork.svg" alt="Teamwork" height={32} width={40} className="mr-4 rounded-md"/>
                    Teamwork
                </Button>
                <Button size="lg" variant="ghost">
                    <Image src="/courses/problemsolving.svg" alt="Problem Solving" height={32} width={40} className="mr-4 rounded-md"/>
                    Problem Solving
                </Button>
                <Button size="lg" variant="ghost">
                    <Image src="/courses/conflictresolution.svg" alt="Conflict Resolution" height={32} width={40} className="mr-4 rounded-md"/>
                    Conflict Resolution
                </Button>
            </div>
        </footer>
    );
};
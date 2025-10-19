import { Computer } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const AIHelper = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-[#2dd4bf] border-teal-600 p-5 text-white flex items-center justify-between border-2 border-b-[6px]">
        <div className="space-y-2.5">
            <h3 className="text-2xl font-bold">
                AI Helper
            </h3>
            <p className="text-lg font-semibold">
                Sharpen your soft skills!
            </p>
        </div>
        <Link href="/ai-helper">
            <Button
                size="lg"
                variant="secondary"
                className="hidden xl:flex border-2 border-b-4 active:border-b-2 cursor-pointer"
            >
                <Computer className="mr-2"/>
                START
            </Button>
        </Link>
    </div>
  );
};

export default AIHelper;
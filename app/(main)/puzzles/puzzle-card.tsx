import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type PuzzleCardProps = {
  title: string;
  description: string;
  href: string;
};

export function PuzzleCard({ title, description, href }: PuzzleCardProps) {
  return (
    <div className="mt-2 w-full max-w-[500px] rounded-xl bg-[#2dd4bf] p-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between border-2 border-b-[6px] border-teal-500 mx-auto">
      <div className="space-y-2.5 text-center sm:text-left">
        <h3 className="text-xl sm:text-2xl font-bold break-words">{title}</h3>
        <p className="text-base sm:text-lg font-semibold">{description}</p>
      </div>
      <Link href={href} className="mt-4 sm:mt-0 flex justify-center sm:block">
        <Button
          size="lg"
          variant="secondary"
          className="border-2 border-b-4 active:border-b-2 cursor-pointer w-full sm:w-auto"
        >
          <Gamepad2 />
          PLAY
        </Button>
      </Link>
    </div>
  );
}
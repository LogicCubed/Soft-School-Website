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
    <div className="mt-1 w-[500px] rounded-xl bg-[#2dd4bf] p-5 text-white flex items-center justify-between border-2 border-b-[6px] border-teal-500">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg font-semibold">{description}</p>
      </div>
      <Link href={href}>
        <Button
          size="lg"
          variant="secondary"
          className="hidden xl:flex border-2 border-b-4 active:border-b-2 cursor-pointer"
        >
          <Gamepad2 className="mr-2" />
          PLAY
        </Button>
      </Link>
    </div>
  );
}
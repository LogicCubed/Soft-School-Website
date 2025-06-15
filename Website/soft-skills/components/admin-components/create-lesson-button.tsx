"use client";

import { createLesson } from "@/actions/lesson";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  unitId: number;
};

export const CreateLessonButton = ({ unitId }: Props) => {
const router = useRouter();

  const handleClick = async () => {
    await createLesson({ unitId });
    router.refresh();
  };

  return (
    <Button
        variant="secondary"
        className="cursor-pointer h-[42px] w-[42px] text-4xl mr-5 font-bold rounded-full flex items-center justify-center"
        onClick={handleClick}
    >
        <PlusIcon></PlusIcon>
    </Button>
  );
}
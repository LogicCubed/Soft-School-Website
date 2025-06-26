"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteLesson } from "@/actions/lesson";
import { Trash2 } from "lucide-react";

export const DeleteLessonButton = ({ lessonId }: { lessonId: number }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // TODO: Update code to re-route to courses page upon lesson deletion
  const handleDelete = () => {
    startTransition(async () => {
      await deleteLesson(lessonId);
      router.refresh();
    });
  };

  return (
    <Button
      variant="danger"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2/>
    </Button>
  );
};
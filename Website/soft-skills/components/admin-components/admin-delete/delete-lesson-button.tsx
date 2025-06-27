"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteLesson } from "@/actions/lesson";
import { Trash2 } from "lucide-react";

export const DeleteLessonButton = ({ lessonId, courseId }: { lessonId: number; courseId: number }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteLesson(lessonId);
      router.push(`/admin/curriculum/courses/${courseId}`);
      router.refresh();
    });
  };

  return (
    <Button
      variant="danger"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
};
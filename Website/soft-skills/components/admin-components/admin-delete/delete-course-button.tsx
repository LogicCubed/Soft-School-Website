"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/actions/course";
import { Trash2 } from "lucide-react";

type DeleteCourseButtonProps = {
  courseId: number;
};

export const DeleteCourseButton = ({ courseId }: DeleteCourseButtonProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCourse(courseId);
      router.refresh();
      router.push("/admin/curriculum");
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

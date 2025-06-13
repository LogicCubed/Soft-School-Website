"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/actions/course";

export const DeleteCourseButton = ({ courseId }: { courseId: number }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
        Delete
    </Button>
  );
};

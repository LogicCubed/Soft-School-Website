"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/actions/course";
import { Trash2 } from "lucide-react";

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
        <Trash2/>
    </Button>
  );
};

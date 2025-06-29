"use client";

import { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useDeleteCourseModal } from "@/store/admin-modals/use-delete-course-modal";

type DeleteCourseButtonProps = {
  courseId: number;
  courseName: string;
};

export const DeleteCourseButton = ({ courseId, courseName }: DeleteCourseButtonProps) => {
  const openDeleteCourseModal = useDeleteCourseModal((state) => state.openDeleteCourseModal);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent parent click
    openDeleteCourseModal(courseId, courseName);
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
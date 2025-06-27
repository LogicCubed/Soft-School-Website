"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type EditCourseButtonProps = {
  courseId: number;
};

export const EditCourseButton = ({ courseId }: EditCourseButtonProps) => {
  void courseId; // prevent unused var warning

  return (
    <Button variant="primary" className="cursor-pointer">
      <Pencil />
    </Button>
  );
};
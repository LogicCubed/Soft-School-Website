"use client";

import { useCreateCourseModal } from "@/store/use-create-course-modal";
import { Button } from "@/components/ui/button";
import { AdminCard } from "./admin-card";
import { CreateCourseModal } from "./admin-modals/create-course-modal"; // <- import your modal here
import { courses } from "@/db/schema";

type Course = typeof courses.$inferSelect;

type AdminCourseManagerProps = {
  initialCourses: Course[];
};

export const AdminCourseManager = ({ initialCourses }: AdminCourseManagerProps) => {
  const { openCreateCourseModal } = useCreateCourseModal();

  return (
    <>
      <Button
        variant="primary"
        className="cursor-pointer mt-5"
        onClick={openCreateCourseModal}
      >
        Create
      </Button>

      <CreateCourseModal /> {}

      <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {initialCourses.map((course) => (
          <AdminCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
          />
        ))}
      </div>
    </>
  );
};

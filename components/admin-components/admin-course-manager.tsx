"use client";

import { useCreateCourseModal } from "@/store/admin-modals/use-create-course-modal";
import { useEditing } from "@/components/admin-components/admin-context/editing-context";
import { Button } from "@/components/ui/button";
import { AdminCard } from "./admin-card";
import { CreateCourseModal } from "./admin-modals/create-course-modal";
import { DeleteCourseModal } from "./admin-modals/delete-course-modal";
import { courses } from "@/db/schema";
import { useEffect, useState } from "react";

type Course = typeof courses.$inferSelect;

type AdminCourseManagerProps = {
  initialCourses: Course[];
};

export const AdminCourseManager = ({ initialCourses }: AdminCourseManagerProps) => {
  const { openCreateCourseModal } = useCreateCourseModal();
  const { pendingCourseDeletes } = useEditing();

  const [visibleCourses, setVisibleCourses] = useState<Course[]>(initialCourses);

  useEffect(() => {
    setVisibleCourses(
      initialCourses.filter(course => !pendingCourseDeletes.has(course.id))
    );
  }, [pendingCourseDeletes, initialCourses]);

  return (
    <>
      <Button
        variant="primary"
        className="cursor-pointer mt-5"
        onClick={openCreateCourseModal}
      >
        Create
      </Button>

      <CreateCourseModal />
      <DeleteCourseModal />

      <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 mb-20">
        {visibleCourses.map(course => (
          <AdminCard
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imageSrc}
            isPendingDelete={pendingCourseDeletes.has(course.id)}
          />
        ))}
      </div>
    </>
  );
};
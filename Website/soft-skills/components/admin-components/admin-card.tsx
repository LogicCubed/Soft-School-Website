"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteCourseButton } from "./admin-delete/delete-course-button";
import { EditCourseButton } from "./admin-edit/edit-course-button";

type AdminCardProps = {
  id: number;
  title: string;
  imageSrc: string;
};

export const AdminCard = ({ id, title, imageSrc }: AdminCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/curriculum/courses/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer border rounded-xl p-3 flex flex-col items-center hover:bg-neutral-100 transition"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={150}
        height={150}
        className="rounded-lg object-cover"
      />
      <h2 className="mt-5 mb-5 font-bold text-neutral-700 text-center">{title}</h2>
      <div className="hidden group-hover:flex gap-2">
        <DeleteCourseButton
          courseId={id}
        />
        <EditCourseButton
          courseId={id}
        />
      </div>
    </div>
  );
};

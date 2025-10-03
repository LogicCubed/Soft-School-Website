"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteCourseButton } from "./admin-delete/delete-course-button";
import { EditCourseButton } from "./admin-edit/edit-course-button";
import clsx from "clsx";

type AdminCardProps = {
  id: number;
  title: string;
  imageSrc: string;
  isPendingDelete?: boolean;
};

export const AdminCard = ({ id, title, imageSrc, isPendingDelete }: AdminCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (isPendingDelete) return; // Prevent navigating to a deleted course
    router.push(`/admin/curriculum/courses/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group relative cursor-pointer border rounded-xl p-3 flex flex-col items-center transition",
        isPendingDelete ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:bg-neutral-100"
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={150}
        height={150}
        className="rounded-lg object-cover"
      />
      <h2 className="mt-5 mb-5 font-bold text-neutral-700 text-center">{title}</h2>
      <div className={clsx(
        "gap-2",
        isPendingDelete ? "flex" : "hidden group-hover:flex"
      )}>
        <DeleteCourseButton courseId={id} courseName={title} />
        {!isPendingDelete && (
          <EditCourseButton courseId={id} />
        )}
      </div>
    </div>
  );
};
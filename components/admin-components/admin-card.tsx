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
    if (isPendingDelete) return;
    router.push(`/admin/curriculum/courses/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative cursor-pointer border-2 border-b-6 border-gray-400 rounded-xl bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px] transition",
        isPendingDelete && "opacity-50 cursor-not-allowed"
      )}
    >
      <Image
        src={imageSrc}
        alt={title}
        width={150}
        height={150}
        className="rounded-lg object-cover"
      />
      <h2 className="mt-3 text-xl font-bold text-neutral-700 text-center">{title}</h2>
      <div className="flex gap-2 mt-2">
        <DeleteCourseButton courseId={id} courseName={title} />
        {!isPendingDelete && <EditCourseButton courseId={id} />}
      </div>
    </div>
  );
};
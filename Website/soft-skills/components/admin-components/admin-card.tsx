"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeleteCourseButton } from "./delete-course-button";

type AdminCardProps = {
  id: number;
  title: string;
  imageSrc: string;
};

export const AdminCard = ({ id, title, imageSrc }: AdminCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/curriculum/courses/edit/${id}`);
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
      <div className="hidden group-hover:block">
        <DeleteCourseButton
          courseId={id}
        />
      </div>
    </div>
  );
};

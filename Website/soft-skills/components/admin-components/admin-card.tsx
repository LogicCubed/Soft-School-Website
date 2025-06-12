"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      className="cursor-pointer border rounded-xl p-3 flex flex-col items-center hover:bg-neutral-100 transition"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={150}
        height={150}
        className="rounded-lg object-cover"
      />
      <h2 className="mt-3 font-bold text-neutral-700 text-center">{title}</h2>
      <div
        className="mt-2 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
      </div>
    </div>
  );
};

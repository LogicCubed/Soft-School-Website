"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { useEditing } from "./admin-context/editing-context";

interface CurriculumHeaderProps {
  title: string;
}

export function CurriculumHeader({ title }: CurriculumHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isOnMainPage = pathname === "/admin/curriculum";

  const { hasPendingChanges, submitChanges } = useEditing();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <Button
          variant="primary"
          size="icon"
          onClick={() => {
            if (!isOnMainPage) router.back();
          }}
          disabled={isOnMainPage}
          className={clsx(
            "rounded-full w-10 h-10 flex items-center justify-center transition cursor-pointer text-white",
            isOnMainPage ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
          )}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Button>
        <h1 className="text-2xl font-extrabold text-sky-400 ml-5">{title}</h1>
      </div>

      <Button
        variant="ghost"
        onClick={submitChanges}
        disabled={!hasPendingChanges}
        className={clsx(
          "font-semibold",
          hasPendingChanges
            ? "bg-green-400 hover:bg-green-500 text-white font-extrabold cursor-pointer"
            : "bg-gray-200 text-gray-500 font-extrabold"
        )}
      >
        Save Changes
      </Button>
    </div>
  );
}
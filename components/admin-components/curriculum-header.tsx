"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { useEditing } from "./admin-context/editing-context";
import { toast, Toaster } from "sonner";

interface CurriculumHeaderProps {
  title: string;
}

export function CurriculumHeader({ title }: CurriculumHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isOnMainPage = pathname === "/admin/curriculum";
  const { hasPendingChanges, submitChanges } = useEditing();

  const handleSaveChanges = async () => {
    await submitChanges();
    toast.success("Changes Saved!", {
      className:
        "bg-sky-500 text-white font-semibold rounded-lg shadow-lg px-4 py-2",
      duration: 3000,
      position: "bottom-right",
    });
  };

  return (
    <div className="relative flex items-center justify-center p-4 border-b border-gray-300">
      <Toaster position="bottom-right" />

      {/* Back button on far left */}
      <div className="absolute left-4">
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
      </div>

      {/* Title centered */}
      <h1 className="text-2xl font-extrabold text-sky-400">{title}</h1>

      {/* Save Changes on far right */}
      <div className="absolute right-4">
        <Button
          variant="ghost"
          onClick={handleSaveChanges}
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
    </div>
  );
}

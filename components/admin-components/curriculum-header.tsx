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
    <div className="relative flex items-center justify-center px-4 py-2 sm:p-4 border-b-2 border-slate-500">
      <Toaster position="bottom-right" />

      {/* Back Button */}
      {!isOnMainPage && (
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
          <Button
            variant="primary"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition cursor-pointer text-white"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>
        </div>
      )}

      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-extrabold text-sky-400 text-center">
        {title}
      </h1>

      {/* Save Button (desktop) */}
      <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 hidden sm:block">
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

      {/* Save Button (mobile) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSaveChanges}
          disabled={!hasPendingChanges}
          className={clsx(
            "text-sm px-3 py-1 font-semibold",
            hasPendingChanges
              ? "bg-green-400 hover:bg-green-500 text-white font-extrabold cursor-pointer"
              : "bg-gray-200 text-gray-500 font-extrabold"
          )}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
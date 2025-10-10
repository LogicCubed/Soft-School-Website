"use client";

import { useDeleteCourseModal } from "@/store/admin-modals/use-delete-course-modal";
import { useEditing } from "@/components/admin-components/admin-context/editing-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const DeleteCourseModal = () => {
  const [isClient, setIsClient] = useState(false);

  const {
    isOpen,
    closeDeleteCourseModal,
    courseIdToDelete,
    courseNameToDelete,
  } = useDeleteCourseModal();

  const { markCourseDeleted } = useEditing();

  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setConfirmationText("");
    }
  }, [isOpen]);

  if (!isClient) return null;

  const isConfirmed = confirmationText.trim() === courseNameToDelete;

  const handleConfirmDelete = () => {
    if (!courseIdToDelete) return;
    if (!isConfirmed) return;

    markCourseDeleted(courseIdToDelete);

    closeDeleteCourseModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeDeleteCourseModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center">
            <Image
              src="/softy-assets/softyscared.svg"
              alt="Logo"
              height={80}
              width={80}
            />
          </div>
          <DialogTitle className="text-center font-bold text-2xl">Wait!</DialogTitle>
          <DialogDescription className="text-center text-base">
            To confirm, type{" "}
            <span className="font-semibold">&quot;{courseNameToDelete}&quot;</span> in the box below:
          </DialogDescription>
          <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="mt-3 w-full border rounded px-3 py-2 text-center"
            placeholder={`Type "${courseNameToDelete}" here`}
          />
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant="primary"
              className="w-full cursor-pointer"
              size="lg"
              onClick={closeDeleteCourseModal}
            >
              Nevermind
            </Button>
            <Button
              variant={isConfirmed ? "danger" : "ghost"}
              className={`w-full cursor-pointer ${!isConfirmed ? "bg-gray-200" : ""}`}
              size="lg"
              onClick={handleConfirmDelete}
              disabled={!isConfirmed}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteUnit } from "@/actions/unit";

export const DeleteUnitButton = ({ unitId }: { unitId: number }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteUnit(unitId);
      router.refresh();
    });
  };

  return (
    <Button
      variant="danger"
      className="cursor-pointer"
      onClick={handleDelete}
    >
        Delete
    </Button>
  );
};

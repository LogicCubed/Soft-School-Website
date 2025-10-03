"use client";

import { Button } from "@/components/ui/button";
import { useCreateUnitModal } from "@/store/admin-modals/use-create-unit-modal";

export function CreateUnitButton() {
  const { openCreateUnitModal } = useCreateUnitModal();

  return (
    <Button
      variant="primary"
      className="cursor-pointer"
      onClick={openCreateUnitModal}
    >
      Create
    </Button>
  );
}
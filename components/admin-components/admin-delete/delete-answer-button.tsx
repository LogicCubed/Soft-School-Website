"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEditing } from "@/components/admin-components/admin-context/editing-context";

interface DeleteAnswerButtonProps {
  answerId: number;
}

export function DeleteAnswerButton({ answerId }: DeleteAnswerButtonProps) {
  const { markOptionDeleted } = useEditing();

  const handleDelete = () => {
    markOptionDeleted(answerId);
  };

  return (
    <Button
      variant="ghost"
      className="cursor-pointer"
      onClick={handleDelete}
    >
      <X />
    </Button>
  );
}
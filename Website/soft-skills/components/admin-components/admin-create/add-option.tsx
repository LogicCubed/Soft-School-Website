"use client";

import { useState, useTransition } from "react";
import { createAnswer } from "@/actions/answer";
import { useRouter } from "next/navigation";

interface NewOptionInputProps {
  challengeId: number;
}

export function NewOptionInput({ challengeId }: NewOptionInputProps) {
  const [isCreated, setIsCreated] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    if (isCreated) return;
    setIsCreated(true);

    startTransition(async () => {
      await createAnswer(challengeId, "New Option", false);
      router.refresh();
    });
  };

  return (
    <input
      type="text"
      onFocus={handleCreate}
      disabled={isPending}
      placeholder="Add Option"
      className="w-full border hover:underline hover:decoration-gray-300 p-1 hover:bg-gray-100 rounded text-gray-500 cursor-text"
    />
  );
}
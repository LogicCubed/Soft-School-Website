"use client";

import { useTransition } from "react";
import { createAnswer } from "@/actions/answer";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useEditing } from "../admin-context/editing-context";

interface NewOptionInputProps {
  challengeId: number;
}

export function NewOptionInput({ challengeId }: NewOptionInputProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addPendingNewOption } = useEditing();

  const handleCreate = () => {
    startTransition(async () => {
      const newAnswer = await createAnswer(challengeId, "New Option", false);

      addPendingNewOption(challengeId);

      const params = new URLSearchParams(searchParams.toString());
      params.set("focusOptionId", String(newAnswer.id));

      router.replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Button
      variant="ghost"
      className="cursor-pointer"
      onClick={handleCreate}
      disabled={isPending}
    >
      <CirclePlus className="w-8 h-8" />
    </Button>
  );
}
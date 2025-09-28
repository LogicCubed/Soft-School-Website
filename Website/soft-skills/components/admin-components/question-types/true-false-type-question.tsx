"use client";

import React, { useTransition } from "react";
import { Circle, CheckCircle } from "lucide-react";
import { QuestionTextInput } from "@/components/admin-components/admin-edit/edit-question";
import { useEditing } from "../admin-context/editing-context";

interface TrueFalseTypeQuestionProps {
  challenge: {
    id: number;
    question: string;
    correctOptionId?: number;
  };
}

export function TrueFalseTypeQuestion({ challenge }: TrueFalseTypeQuestionProps) {
  const [isPending] = useTransition();
  const { updateCorrectAnswer, getMergedCorrectAnswer } = useEditing();

  // Determine which option is currently correct
  const mergedCorrectOptionId = getMergedCorrectAnswer(
    challenge.id,
    challenge.correctOptionId ?? -1
  );

  const handleSetCorrect = (optionId: number) => {
    updateCorrectAnswer(challenge.id, optionId);
  };

  return (
    <div className="mt-5">
      {/* Editable question text */}
      <QuestionTextInput
        initialText={challenge.question}
        questionId={challenge.id}
      />

      {/* True/False buttons */}
      <div className="mt-5 flex flex-col gap-4">
        {/* True */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSetCorrect(1)}>
          <button
            disabled={isPending}
            className="flex items-center justify-center w-6 h-6 hover:cursor-pointer"
          >
            {mergedCorrectOptionId === 1 ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <Circle className="text-gray-300 w-5 h-5" />
            )}
          </button>
          <span>True</span>
        </div>

        {/* False */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSetCorrect(2)}>
          <button
            disabled={isPending}
            className="flex items-center justify-center w-6 h-6 hover:cursor-pointer"
          >
            {mergedCorrectOptionId === 2 ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <Circle className="text-gray-300 w-5 h-5" />
            )}
          </button>
          <span>False</span>
        </div>
      </div>
    </div>
  );
}
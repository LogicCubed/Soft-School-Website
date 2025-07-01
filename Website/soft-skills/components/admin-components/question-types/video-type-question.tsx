"use client";

import React from "react";
import { useTransition } from "react";
import { Circle, CheckCircle } from "lucide-react";
import { OptionTextInput } from "@/components/admin-components/admin-edit/edit-answer";
import { NewOptionInput } from "@/components/admin-components/admin-create/add-option";
import { ExplanationTextInput } from "@/components/admin-components/admin-create/explanation-button";
import { DeleteAnswerButton } from "@/components/admin-components/admin-delete/delete-answer-button";
import { useEditing } from "../admin-context/editing-context";

interface VideoTypeQuestionProps {
  challenge: {
    id: number;
    question: string;
    callToAction: string;
    challengeOptions: {
      id: number;
      text: string;
      correct: boolean;
      explanation?: string | null;
    }[];
  };
}

export function VideoTypeQuestion({ challenge }: VideoTypeQuestionProps) {
  const [isPending] = useTransition();
  const {
    pendingDeletedOptions,
    updateCorrectAnswer,
    getMergedCorrectAnswer
  } = useEditing();

  // Determine the merged correct option id (includes pending changes)
  const mergedCorrectOptionId = getMergedCorrectAnswer(
    challenge.id,
    challenge.challengeOptions.find(o => o.correct)?.id ?? -1
  );

  const handleSetCorrect = (optionId: number) => {
    updateCorrectAnswer(challenge.id, optionId);
  };

  return (
    <>
      <div className="relative mt-5">
        {challenge.challengeOptions
          .slice()
          .sort((a, b) => a.id - b.id)
          .filter(option => !pendingDeletedOptions.has(option.id))
          .map((option) => (
            <div
              key={option.id}
              className="group flex items-center hover:decoration-gray-300 hover:underline-offset-4 mt-5 pr-12"
              style={{ position: "relative" }}
            >
              <div className="w-[90%] flex items-center">
                <button
                  onClick={() => handleSetCorrect(option.id)}
                  disabled={isPending}
                  className="mr-5 ml-5 cursor-pointer"
                >
                  {mergedCorrectOptionId === option.id ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-300" />
                  )}
                </button>
                <OptionTextInput
                  initialText={option.text}
                  optionId={option.id}
                />
                <div className="ml-5">
                  <ExplanationTextInput
                    initialExplanation={option.explanation ?? ""}
                    answerId={option.id}
                  />
                </div>
              </div>

              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                style={{ width: "40px", textAlign: "center" }}
              >
                <DeleteAnswerButton answerId={option.id} />
              </div>
            </div>
          ))}
      </div>

      <div className="w-[85.5%] flex items-center mt-5 ml-2.75">
        <NewOptionInput challengeId={challenge.id} />
      </div>
    </>
  );
}
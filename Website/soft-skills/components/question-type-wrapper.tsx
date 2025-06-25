"use client";

import { QuestionType } from "./question-type";

interface QuestionTypeWrapperProps {
  initialType: string;
  questionId: number;
}

export function QuestionTypeWrapper({ initialType, questionId }: QuestionTypeWrapperProps) {
  const handleValueChange = (newType: string) => {
    // TODO: CODE HERE
  };

  return (
    <QuestionType defaultValue={initialType} onValueChange={handleValueChange} />
  );
}
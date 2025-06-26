"use client";

import { useState, useEffect } from "react";
import { useEditing } from "@/components/admin-components/admin-context/editing-context";

interface QuestionTextInputProps {
  initialText: string;
  questionId: number;
}

export function QuestionTextInput({
  initialText,
  questionId,
}: QuestionTextInputProps) {
  const { pendingQuestionEdits, updateQuestionText } = useEditing();

  // Use the locally edited text if it exists, else fallback to initial text
  const editedText = pendingQuestionEdits[questionId] ?? initialText;

  // Local state to smoothly control input
  const [text, setText] = useState(editedText);

  // Sync local state when editedText changes (e.g. after submit or reset)
  useEffect(() => {
    setText(editedText);
  }, [editedText]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateQuestionText(questionId, newText); // Update local context state, no API call here
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      className="w-full border hover:underline hover:decoration-gray-300 p-6 hover:bg-gray-100 rounded mt-2"
    />
  );
}
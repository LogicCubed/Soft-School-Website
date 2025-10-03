"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { useEditing } from "../admin-context/editing-context";

interface ExplanationTextInputProps {
  initialExplanation: string;
  answerId: number;
}

export function ExplanationTextInput({ initialExplanation, answerId }: ExplanationTextInputProps) {
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState(initialExplanation);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updateExplanation } = useEditing();

  useEffect(() => {
    if (showInput) {
      textareaRef.current?.focus();
    }
  }, [showInput]);

  useEffect(() => {
    setText(initialExplanation);
  }, [initialExplanation]);

  const maxChars = 100;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateExplanation(answerId, newText);
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        className="cursor-pointer"
        onClick={() => setShowInput((prev) => !prev)}
      >
        <NotebookPen />
      </Button>

      {showInput && (
        <div className="absolute top-8 left-0 z-10 bg-white shadow-md rounded p-2 w-72">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="Enter explanation"
            rows={4}
            maxLength={maxChars}
            className="w-full text-sm border rounded px-2 py-1 outline-none resize-none"
          />
          <p className="text-gray-500">{text.length}/{maxChars}</p>
        </div>
      )}
    </div>
  );
}
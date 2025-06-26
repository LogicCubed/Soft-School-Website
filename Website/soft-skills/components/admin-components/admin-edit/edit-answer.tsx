"use client";

import { useState, useEffect } from "react";
import { useEditing } from "../admin-context/editing-context";

interface OptionTextInputProps {
  initialText: string;
  optionId: number;
}

export function OptionTextInput({ initialText, optionId }: OptionTextInputProps) {
  const { pendingOptionEdits, updateOptionText } = useEditing();
  const [text, setText] = useState(initialText);

  useEffect(() => {
    if (pendingOptionEdits[optionId] !== undefined) {
      setText(pendingOptionEdits[optionId]);
    } else {
      setText(initialText);
    }
  }, [initialText, pendingOptionEdits, optionId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    updateOptionText(optionId, e.target.value);
  };

  return (
    <input
      type="text"
      value={text}
      onChange={handleChange}
      className="w-full border hover:underline hover:decoration-gray-300 p-2 hover:bg-gray-100 rounded"
    />
  );
}
"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { updateQuestionText as apiUpdateQuestionText } from "@/actions/question";
import { updateOptionText as apiUpdateOptionText, deleteAnswer } from "@/actions/answer";
import { usePathname, useRouter } from "next/navigation";

interface EditingContextValue {
  pendingQuestionEdits: Record<number, string>;
  updateQuestionText: (questionId: number, text: string) => void;

  pendingOptionEdits: Record<number, string>;
  updateOptionText: (optionId: number, text: string) => void;

  pendingNewOptions: Set<number>;
  addPendingNewOption: (optionId: number) => void;

  pendingDeletedOptions: Set<number>;
  markOptionDeleted: (optionId: number) => void;

  hasPendingChanges: boolean;
  submitChanges: () => Promise<void>;

  // NEW: helpers to get the merged current text (pending edit or original)
  getMergedQuestionText: (questionId: number, originalText: string) => string;
  getMergedOptionText: (optionId: number, originalText: string) => string;
}

const EditingContext = createContext<EditingContextValue | undefined>(undefined);

export function EditingProvider({ children }: { children: React.ReactNode }) {
  const [pendingQuestionEdits, setPendingQuestionEdits] = useState<Record<number, string>>({});
  const [pendingOptionEdits, setPendingOptionEdits] = useState<Record<number, string>>({});
  const [pendingNewOptions, setPendingNewOptions] = useState<Set<number>>(new Set());
  const [pendingDeletedOptions, setPendingDeletedOptions] = useState<Set<number>>(new Set());

  const router = useRouter();
  const pathname = usePathname();

  function updateQuestionText(questionId: number, text: string) {
    setPendingQuestionEdits((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  }

  function updateOptionText(optionId: number, text: string) {
    setPendingOptionEdits((prev) => ({
      ...prev,
      [optionId]: text,
    }));
  }

  function addPendingNewOption(optionId: number) {
    setPendingNewOptions((prev) => {
      const next = new Set(prev);
      next.add(optionId);
      return next;
    });
  }

  function markOptionDeleted(optionId: number) {
    setPendingDeletedOptions((prev) => {
      const next = new Set(prev);
      next.add(optionId);
      return next;
    });

    // Clean up conflicting pending states
    setPendingOptionEdits((prev) => {
      const copy = { ...prev };
      delete copy[optionId];
      return copy;
    });

    setPendingNewOptions((prev) => {
      const next = new Set(prev);
      next.delete(optionId);
      return next;
    });
  }

  const hasPendingChanges = useMemo(() => {
    return (
      Object.keys(pendingQuestionEdits).length > 0 ||
      Object.keys(pendingOptionEdits).length > 0 ||
      pendingNewOptions.size > 0 ||
      pendingDeletedOptions.size > 0
    );
  }, [pendingQuestionEdits, pendingOptionEdits, pendingNewOptions, pendingDeletedOptions]);

  // NEW helpers to get merged text (local edit overrides original)
  function getMergedQuestionText(questionId: number, originalText: string) {
    return pendingQuestionEdits[questionId] ?? originalText;
  }

  function getMergedOptionText(optionId: number, originalText: string) {
    return pendingOptionEdits[optionId] ?? originalText;
  }

  async function submitChanges() {
    // Delete options
    for (const optionId of pendingDeletedOptions) {
      await deleteAnswer(optionId);
    }

    // Update questions
    for (const [questionIdStr, text] of Object.entries(pendingQuestionEdits)) {
      const questionId = Number(questionIdStr);
      await apiUpdateQuestionText(questionId, text);
    }

    // Update options
    for (const [optionIdStr, text] of Object.entries(pendingOptionEdits)) {
      const optionId = Number(optionIdStr);
      await apiUpdateOptionText(optionId, text);
    }

    // Clear all pending changes
    setPendingQuestionEdits({});
    setPendingOptionEdits({});
    setPendingNewOptions(new Set());
    setPendingDeletedOptions(new Set());

    router.replace(pathname);
  }

  const value: EditingContextValue = {
    pendingQuestionEdits,
    updateQuestionText,
    pendingOptionEdits,
    updateOptionText,
    pendingNewOptions,
    addPendingNewOption,
    pendingDeletedOptions,
    markOptionDeleted,
    hasPendingChanges,
    submitChanges,
    getMergedQuestionText,
    getMergedOptionText,
  };

  return <EditingContext.Provider value={value}>{children}</EditingContext.Provider>;
}

export function useEditing() {
  const context = useContext(EditingContext);
  if (!context) {
    throw new Error("useEditing must be used within an EditingProvider");
  }
  return context;
}
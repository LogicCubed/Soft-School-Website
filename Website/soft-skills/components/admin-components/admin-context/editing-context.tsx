"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { updateQuestionText as apiUpdateQuestionText } from "@/actions/question";
import {
  updateOptionText as apiUpdateOptionText,
  deleteAnswer,
  updateCorrectAnswer as apiUpdateCorrectAnswer,
  updateOptionExplanation as apiUpdateOptionExplanation,
} from "@/actions/answer";
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

  pendingCourseDeletes: Set<number>;
  markCourseDeleted: (courseId: number) => void;

  pendingCorrectAnswerEdits: Record<number, number>;
  updateCorrectAnswer: (challengeId: number, optionId: number) => void;

  pendingExplanationEdits: Record<number, string>;
  updateExplanation: (optionId: number, explanation: string) => void;

  hasPendingChanges: boolean;
  submitChanges: () => Promise<void>;

  getMergedQuestionText: (questionId: number, originalText: string) => string;
  getMergedOptionText: (optionId: number, originalText: string) => string;
  getMergedCorrectAnswer: (challengeId: number, originalOptionId: number) => number;
  getMergedExplanation: (optionId: number, originalExplanation: string) => string;
}

const EditingContext = createContext<EditingContextValue | undefined>(undefined);

export function EditingProvider({ children }: { children: React.ReactNode }) {
  const [pendingQuestionEdits, setPendingQuestionEdits] = useState<Record<number, string>>({});
  const [pendingOptionEdits, setPendingOptionEdits] = useState<Record<number, string>>({});
  const [pendingNewOptions, setPendingNewOptions] = useState<Set<number>>(new Set());
  const [pendingDeletedOptions, setPendingDeletedOptions] = useState<Set<number>>(new Set());
  const [pendingCourseDeletes, setPendingCourseDeletes] = useState<Set<number>>(new Set());
  const [pendingCorrectAnswerEdits, setPendingCorrectAnswerEdits] = useState<Record<number, number>>({});
  const [pendingExplanationEdits, setPendingExplanationEdits] = useState<Record<number, string>>({});

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

    setPendingExplanationEdits((prev) => {
      const copy = { ...prev };
      delete copy[optionId];
      return copy;
    });
  }

  function markCourseDeleted(courseId: number) {
    setPendingCourseDeletes((prev) => {
      const next = new Set(prev);
      next.add(courseId);
      return next;
    });
  }

  function updateCorrectAnswer(challengeId: number, optionId: number) {
    setPendingCorrectAnswerEdits((prev) => ({
      ...prev,
      [challengeId]: optionId,
    }));
  }

  function updateExplanation(optionId: number, explanation: string) {
    setPendingExplanationEdits((prev) => ({
      ...prev,
      [optionId]: explanation,
    }));
  }

  const hasPendingChanges = useMemo(() => {
    return (
      Object.keys(pendingQuestionEdits).length > 0 ||
      Object.keys(pendingOptionEdits).length > 0 ||
      pendingNewOptions.size > 0 ||
      pendingDeletedOptions.size > 0 ||
      pendingCourseDeletes.size > 0 ||
      Object.keys(pendingCorrectAnswerEdits).length > 0 ||
      Object.keys(pendingExplanationEdits).length > 0
    );
  }, [
    pendingQuestionEdits,
    pendingOptionEdits,
    pendingNewOptions,
    pendingDeletedOptions,
    pendingCourseDeletes,
    pendingCorrectAnswerEdits,
    pendingExplanationEdits,
  ]);

  async function submitChanges() {
    // Delete courses
    for (const courseId of pendingCourseDeletes) {
      await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
    }

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

    // Update correct answers
    for (const [challengeIdStr, optionId] of Object.entries(pendingCorrectAnswerEdits)) {
      const challengeId = Number(challengeIdStr);
      await apiUpdateCorrectAnswer(optionId, challengeId);
    }

    // Update explanations
    for (const [optionIdStr, explanation] of Object.entries(pendingExplanationEdits)) {
      const optionId = Number(optionIdStr);
      await apiUpdateOptionExplanation(optionId, explanation);
    }

    // Clear all pending changes
    setPendingCourseDeletes(new Set());
    setPendingQuestionEdits({});
    setPendingOptionEdits({});
    setPendingNewOptions(new Set());
    setPendingDeletedOptions(new Set());
    setPendingCorrectAnswerEdits({});
    setPendingExplanationEdits({});

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
    pendingCourseDeletes,
    markCourseDeleted,
    pendingCorrectAnswerEdits,
    updateCorrectAnswer,
    pendingExplanationEdits,
    updateExplanation,
    hasPendingChanges,
    submitChanges,
    getMergedQuestionText: (q, o) => pendingQuestionEdits[q] ?? o,
    getMergedOptionText: (oId, oText) => pendingOptionEdits[oId] ?? oText,
    getMergedCorrectAnswer: (cId, oId) => pendingCorrectAnswerEdits[cId] ?? oId,
    getMergedExplanation: (oId, ex) => pendingExplanationEdits[oId] ?? ex,
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
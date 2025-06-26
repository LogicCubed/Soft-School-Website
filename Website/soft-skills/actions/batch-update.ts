import { updateOptionText, updateQuestionText } from "./question";

export async function batchUpdateQuestionsAndOptions(
  questionEdits: Record<number, string>,
  optionEdits: Record<number, string>
) {
  // Update questions
  for (const [questionId, text] of Object.entries(questionEdits)) {
    await updateQuestionText(Number(questionId), text);
  }

  // Update options
  for (const [optionId, text] of Object.entries(optionEdits)) {
    await updateOptionText(Number(optionId), text);
  }
}
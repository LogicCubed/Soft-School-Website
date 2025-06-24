import { CreateQuestionButton } from "@/components/admin-components/create-question-button";
import { getLessonByIdForAdmin } from "@/db/queries";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

interface EditLessonPageProps {
  params: {
    lessonId: string;
  };
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  if (!isAdmin) {
    redirect("/");
  }

  const lessonId = Number(params.lessonId);
  if (isNaN(lessonId)) {
    return <div className="p-4">Invalid lesson ID.</div>;
  }

  const lesson = await getLessonByIdForAdmin(lessonId);

  if (!lesson) {
    return <div className="p-4">Lesson not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{lesson.title}</h1>

      {lesson.challenges.length === 0 ? (
        <div className="text-gray-500 mb-6">No questions found for this lesson.</div>
      ) : (
        <div className="space-y-4 mb-6">
          {lesson.challenges.map((challenge, idx) => (
            <div
              key={challenge.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="text-sm text-gray-500 mb-1">
                Question {idx + 1} • Type: {challenge.type}
              </div>
              <div className="text-lg font-medium">{challenge.question}</div>
            </div>
          ))}
        </div>
      )}

      <CreateQuestionButton lessonId={lessonId} />
    </div>
  );
}
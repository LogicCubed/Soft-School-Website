import { CreateQuestionButton } from "@/components/admin-components/admin-create/create-question-button";
import { DeleteQuestionButton } from "@/components/admin-components/admin-delete/delete-question-button";
import { EllipsisVertical, GripHorizontal } from "lucide-react";
import { QuestionTypeWrapper } from "@/components/question-type-wrapper";
import { getLessonByIdForAdmin, getVideoUrl } from "@/db/queries";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { CurriculumHeader } from "@/components/admin-components/curriculum-header";
import { DeleteLessonButton } from "@/components/admin-components/admin-delete/delete-lesson-button";
import Image from "next/image";
import { SelectTypeQuestion } from "@/components/admin-components/question-types/select-type-question";
import { EditingProvider } from "@/components/admin-components/admin-context/editing-context";

interface EditLessonPageProps {
  params: {
    lessonId: string;
  };
}

export default async function EditLessonPage({ params }: EditLessonPageProps) {
  if (!isAdmin) {
    redirect("/");
  }

  // Extract the lessonId parameter from the URL and convert it to a number
  const lessonId = Number(params.lessonId);
  if (isNaN(lessonId)) {
    return <p>Invalid lesson ID.</p>;
  }

  // Fetch the lesson data from the database using the admin-specific query function
  const lesson = await getLessonByIdForAdmin(lessonId);

  // If no lesson is found with the given ID, show an error message
  if (!lesson) {
    // TODO: Stylize this
    return <p>Lesson not found.</p>;
  }

  // For each challenge of type VIDEO, fetch the video URL
  const challengesWithVideos = await Promise.all(
    lesson.challenges.map(async (challenge) => {
      if (challenge.type === "VIDEO") {
        const videoUrl = await getVideoUrl(challenge.id);
        return { ...challenge, videoUrl };
      }
      return challenge;
    })
  );

  // Constructs the title for the Header to display the Lesson's Course, Unit, and ID
  const headerTitle =
    lesson.unit && lesson.unit.course
      ? `${lesson.unit.course.title} | Unit ${lesson.unit.order ?? lesson.unit.id} | ${lesson.title}`
      : "Curriculum";

  return (
    <EditingProvider>
    <div>
      <CurriculumHeader title={headerTitle} />

      {lesson.challenges.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <Image
            src="/softy-assets/softyscared.svg"
            alt="logo"
            height={128}
            width={128}
          />
          <h2 className="text-2xl font-bold text-gray-500 ml-5">No questions yet. Start by adding your first one!</h2>
        </div>
      ) : (
        <div>
          {lesson.challenges.map((challenge, idx) => (
            <div
              key={challenge.id}
              className="group relative border border-gray-300 rounded-lg p-4 shadow-sm mb-5 mt-5 flex flex-col"
            >
              <div className="hidden group-hover:block absolute top-2 left-1/2 transform -translate-x-1/2">
                <GripHorizontal className="text-gray-400 w-5 h-5 cursor-move" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <h1 className="text-1xl font-bold text-neutral-700">Question {idx + 1}</h1>
                  <QuestionTypeWrapper initialType={challenge.type} questionId={challenge.id} />
                </div>
                {challenge.type === "SELECT" && (
                  <SelectTypeQuestion challenge={challenge}/>
                )}

                {challenge.type === "ASSIST" && (
                  <></>
                  // TODO: DELETE ASSIST TYPE
                )}

                {challenge.type === "VIDEO" && (
                  <>
                  {challenge.videoUrl ? (
                    <video
                      src={challenge.videoUrl}
                      controls
                      className="mt-2 max-w-[400px] rounded mx-auto"
                    />
                  ) : (
                    <p>UPLOAD VIDEO!</p>
                  )}
                  </>
                )}

                {challenge.type === "AUDIO" && (
                  <></>
                )}
              </div>
              <div className="w-[98%] border-t border-gray-300 mx-auto mb-5 mt-5" />
              <div className="flex justify-end items-center mr-5 space-x-3">
                <DeleteQuestionButton questionId={challenge.id} />
                <EllipsisVertical className="w-8 h-8 cursor-pointer text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-5">
        <CreateQuestionButton lessonId={lessonId}/>
        <DeleteLessonButton lessonId={lessonId}/>
      </div>
    </div>
    </EditingProvider>
  );
}
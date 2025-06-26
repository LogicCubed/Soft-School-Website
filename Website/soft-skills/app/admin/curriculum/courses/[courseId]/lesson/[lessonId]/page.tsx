import { CreateQuestionButton } from "@/components/admin-components/admin-create/create-question-button";
import { DeleteQuestionButton } from "@/components/admin-components/admin-delete/delete-question-button";
import { Circle, EllipsisVertical, GripHorizontal, GripVertical } from "lucide-react";
import { QuestionTypeWrapper } from "@/components/question-type-wrapper";
import { getLessonByIdForAdmin, getVideoUrl } from "@/db/queries";
import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { DeleteAnswerButton } from "@/components/admin-components/admin-delete/delete-answer-button";
import { CurriculumHeader } from "@/components/admin-components/curriculum-header";
import { DeleteLessonButton } from "@/components/admin-components/admin-delete/delete-lesson-button";
import { QuestionTextInput } from "@/components/admin-components/admin-edit/edit-question";
import { OptionTextInput } from "@/components/admin-components/admin-edit/edit-answer";
import { NewOptionInput } from "@/components/admin-components/admin-create/add-option";

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
    <div>
      <CurriculumHeader title={headerTitle} />

      {lesson.challenges.length === 0 ? (
        <p>No Questions Found!</p>
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

                {challenge.type === "SELECT" ? (
                  <>
                    {/* SELECT TYPE QUESTION */}
                    <div className="mt-5 p-5">
                      <QuestionTextInput
                        initialText={challenge.question}
                        questionId={challenge.id}
                      />
                    </div>

                    {/* MAP OUT MULTIPLE CHOICE OPTIONS */}
                    <div className="relative mt-5">
                      {challenge.challengeOptions.map((option, idx) => (
                        <div
                          key={option.id}
                          className="group flex items-center hover:decoration-gray-300 hover:underline-offset-4 mt-5 pr-12"
                          style={{ position: 'relative' }}
                        >
                          <div className="w-[90%] flex items-center">
                            <Circle className="text-gray-300 mr-5 ml-5" />
                            <OptionTextInput
                              initialText={option.text}
                              optionId={option.id}
                            />
                          </div>

                          <div
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                            style={{ width: '40px', textAlign: 'center' }}
                          >
                            <DeleteAnswerButton answerId={option.id} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ADD MULTIPLE CHOICE OPTION */}
                    <div
                      className="w-[85.5%] flex items-center mt-5"
                    >
                      <Circle className="text-gray-300 mr-5 ml-5"/>
                      <NewOptionInput challengeId={challenge.id} />
                    </div>
                  </>

                ) : challenge.type === "ASSIST" ? (
                  <>
                    {/* ASSIST TYPE QUESTION CONTENT */}
                  </>

                ) : challenge.type === "VIDEO" ? (
                  <>
                    {/* VIDEO TYPE QUESTION CONTENT */}
                    {challenge.videoUrl ? (
                      <video
                        src={challenge.videoUrl}
                        controls
                        className="mt-2 max-w-[400px] rounded"
                      />
                    ) : (
                      <p>UPLOAD VIDEO!</p>
                    )}
                  </>

                ) : challenge.type === "AUDIO" ? (
                  <>
                    {/* AUDIO TYPE QUESTION CONTENT */}
                    <p>UPLOAD AUDIO!</p>
                  </>

                ) : (
                  <>
                    {/* FALLBACK QUESTION CONTENT */}
                  </>

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
  );
}
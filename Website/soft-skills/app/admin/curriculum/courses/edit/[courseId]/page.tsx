import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/db/queries";
import Image from "next/image";
import { notFound } from "next/navigation";

type EditCoursePageProps = {
  params: {
    courseId: string;
  };
};

const EditCoursePage = async ({ params }: EditCoursePageProps) => {
  const courseId = Number(params.courseId);
  if (isNaN(courseId)) notFound();

  const course = await getCourseById(courseId);
  if (!course) notFound();

  return (
    <div>
      <FeedWrapper>
        {course.units.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <h1 className="text-2xl font-bold text-neutral-700">{course.title}</h1>
            <Image
              src="/softy-assets/softyscared.svg"
              alt="logo"
              height={128}
              width={128}
            />
            <h2>No Units were found for this Course!</h2>
            <Button variant="primary" className="cursor-pointer m-4">
              Create Unit
            </Button>
          </div>
        ) : (
          <>
            <div>
              <Button
                variant="primary"
                className="cursor-pointer mb-5 mr-5"
              >
                Create Unit
              </Button>
              <Button
                variant="primary"
                className="cursor-pointer mb-5 mr-5"
              >
                Create Lesson
              </Button>
            </div>
            {course.units.map((unit) => (
              <div key={unit.id} className="mb-10">
                <div className="w-full rounded-xl bg-sky-500 p-5 text-white font-bold text-2xl flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {unit.title || `Unit ${unit.order}`}
                  </h2>
                  <p className="text-lg">
                    {unit.description}
                  </p>
                </div>

                {unit.lessons.length === 0 ? (
                  <p className="text-neutral-500 mt-2">No lessons in this unit.</p>
                ) : (
                  <div className="flex flex-wrap mt-4">
                    {unit.lessons.map((lesson) => (
                      <Button
                        variant="secondary"
                        size="lg"
                        className="mr-5"
                        key={lesson.id}
                      >
                        {lesson.title || `Lesson ${lesson.order}`}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </FeedWrapper>
    </div>
  );
};

export default EditCoursePage;
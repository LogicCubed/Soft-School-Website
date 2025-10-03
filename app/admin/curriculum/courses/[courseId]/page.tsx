import { FeedWrapper } from "@/components/feed-wrapper";
import { Button } from "@/components/ui/button";
import { getCourseById } from "@/db/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DeleteUnitButton } from "@/components/admin-components/admin-delete/delete-unit-button";
import { CreateUnitButton } from "@/components/admin-components/admin-create/create-unit-button";
import { CreateUnitModal } from "@/components/admin-components/admin-modals/create-unit-modal";
import { CreateLessonButton } from "@/components/admin-components/admin-create/create-lesson-button";
import Link from "next/link";
import { CurriculumHeader } from "@/components/admin-components/curriculum-header";

const EditCoursePage = async ({ params }: { params: Promise<{ courseId: string }> }) => {
  const resolvedParams = await params;
  const courseId = Number(resolvedParams.courseId);
  if (isNaN(courseId)) notFound();

  const course = await getCourseById(courseId);
  if (!course) return notFound();

  return (
    <div>
      <FeedWrapper>
        <CurriculumHeader title={course.title} />
        {course.units.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <Image
              src="/softy-assets/softyscared.svg"
              alt="logo"
              height={128}
              width={128}
            />
            <h2 className="text-2xl font-bold text-gray-500 ml-5">No Units yet. Start by adding your first one!</h2>
            <div className="m-4">
              <CreateUnitButton/>
              <CreateUnitModal courseId={courseId} />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-5 mr-5 mt-5">
              <CreateUnitButton/>
              <CreateUnitModal courseId={courseId} />
            </div>
            {course.units.map((unit) => (
              <div key={unit.id} className="mb-10">
                <div className="group relative w-full rounded-xl bg-sky-500 p-5 text-white font-bold text-2xl flex flex-col">
                  <h2 className="text-2xl font-bold">
                    {unit.title || `Unit ${unit.order}`}
                  </h2>
                  <p className="text-lg">
                    {unit.description}
                  </p>
                  {/* REMOVE ABSOLUTE, MAKE THE BUTTON POSITION THE SAME */}
                  <div className="hidden group-hover:flex absolute top-1/2 right-0 -translate-y-1/2 items-center pr-4">
                    <DeleteUnitButton unitId={unit.id} />
                  </div>
                </div>
                {unit.lessons.length === 0 ? (
                  <div className="mt-5">
                    <CreateLessonButton unitId={unit.id}/>
                  </div>
                ) : (
                  <div className="flex flex-wrap mt-5">
                    {unit.lessons.map((lesson) => (
                      <Link
                        href={`/admin/curriculum/courses/${courseId}/lesson/${lesson.id}`}
                        key={lesson.id}
                      >
                        <Button
                          variant="secondary"
                          className="cursor-pointer mr-5 mb-5"
                          key={lesson.id}
                        >
                          {lesson.title || `Lesson ${lesson.order}`}
                        </Button>
                      </Link>
                    ))}
                    <CreateLessonButton unitId={unit.id}/>
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
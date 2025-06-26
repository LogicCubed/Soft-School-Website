import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { getCourses } from "@/db/queries";
import { AdminCourseManager } from "@/components/admin-components/admin-course-manager";
import { CurriculumHeader } from "@/components/admin-components/curriculum-header";

const AdminPage = async () => {
  if (!isAdmin) {
    redirect("/");
  }

  const courses = await getCourses();

  return (
    <div>
      <CurriculumHeader title="Courses" />
      <AdminCourseManager
        initialCourses={courses}
      />
    </div>
  );
};

export default AdminPage;
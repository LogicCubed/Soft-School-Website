import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { getCourses } from "@/db/queries";
import { AdminCourseManager } from "@/components/admin/admin-course-manager";

const AdminPage = async () => {
  if (!isAdmin) {
    redirect("/");
  }

  const courses = await getCourses();

  return (
    <div>
      <h1 className="text-2xl font-bold text-neutral-700">Current Courses:</h1>
      <AdminCourseManager initialCourses={courses} />
    </div>
  );
};

export default AdminPage;

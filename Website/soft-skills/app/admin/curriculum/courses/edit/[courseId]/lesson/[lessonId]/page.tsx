import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const EditLessonPage = async () => {
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div>
      EDIT THE LESSON HERE!
    </div>
  );
};

export default EditLessonPage;
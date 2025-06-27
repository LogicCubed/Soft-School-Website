import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div>
      ADMIN HOMEPAGE
    </div>
  );
};

export default AdminPage;

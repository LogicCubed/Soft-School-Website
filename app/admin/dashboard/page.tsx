import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/learn");
  }

  return (
    <div>
      ADMIN DASHBOARD
    </div>
  );
};

export default AdminPage;

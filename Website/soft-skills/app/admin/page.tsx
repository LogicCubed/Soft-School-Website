import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AppClient from "./appclient";

const AdminPage = async () => {

    const isAdminUser = await isAdmin();

    if (!isAdmin) {
        redirect("/");
    }
    
    return (
        <AppClient />
    );
};

export default AdminPage;
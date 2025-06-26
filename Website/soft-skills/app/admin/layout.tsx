import { AdminSidebar } from "@/components/admin-components/admin-sidebar";
import { MobileHeader } from "@/components/mobile-header";

type Props = {
    children: React.ReactNode;
};

const MainAdminLayout = ({
    children,
}: Props) => {
    return (
        <>
            <MobileHeader/>
            <AdminSidebar className="hidden lg:flex"/>
            <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                <div className="max-w-[1056px] mx-auto pt-6 h-full">
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainAdminLayout;
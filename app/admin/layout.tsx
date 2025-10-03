"use client";

import { AdminSidebar } from "@/components/admin-components/admin-sidebar";
import { MobileAdminFooter } from "@/components/mobile-components/mobile-admin-footer";

type Props = {
  children: React.ReactNode;
};

const MainAdminLayout = ({ children }: Props) => {
  return (
    <>
      {/* Sidebar visible only on lg+ */}
      <AdminSidebar className="hidden lg:flex" />

      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>

      {/* Mobile Admin Footer visible only below lg */}
      <MobileAdminFooter />
    </>
  );
};

export default MainAdminLayout;
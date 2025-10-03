import { MobileHeader } from "@/components/mobile-components/mobile-header";
import { MobileFooter } from "@/components/mobile-components/mobile-footer";
import { Sidebar } from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      {/* Mobile header on small screens only */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Sidebar on large screens */}
      <Sidebar className="hidden lg:flex" />

      {/* Main content */}
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>

      {/* Mobile footer on small screens only */}
      <div className="lg:hidden">
        <MobileFooter />
      </div>
    </>
  );
};

export default MainLayout;
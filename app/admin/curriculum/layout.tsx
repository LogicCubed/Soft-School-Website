import { EditingProvider } from "@/components/admin-components/admin-context/editing-context";
import { ReactNode } from "react";

export default function CurriculumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#231e31] min-h-screen flex flex-col">
      <EditingProvider>
        <main className="p-6 flex-1">{children}</main>
      </EditingProvider>
    </div>
  );
}
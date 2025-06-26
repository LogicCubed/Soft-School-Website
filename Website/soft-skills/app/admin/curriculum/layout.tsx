import { EditingProvider } from "@/components/admin-components/admin-context/editing-context";
import { CurriculumHeader } from "@/components/admin-components/curriculum-header";
import { ReactNode } from "react";

export default function CurriculumLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <EditingProvider>
        <main className="p-6">{children}</main>
      </EditingProvider>
    </div>
  );
}
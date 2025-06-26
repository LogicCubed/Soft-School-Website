import { CurriculumHeader } from "@/components/admin-components/curriculum-header";
import { ReactNode } from "react";

export default function CurriculumLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <main className="p-6">{children}</main>
    </div>
  );
}
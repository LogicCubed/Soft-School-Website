// app/settings/layout.tsx
import { ReactNode } from "react";
import { StickyWrapper } from "@/components/sticky-wrapper";
import Account from "./account";
import Support from "./support";

type Props = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-row-reverse gap-6 px-6">
      <div className="w-80">
        <StickyWrapper>
            <Account />
            <Support />
        </StickyWrapper>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
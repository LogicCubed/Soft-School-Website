import { ReactNode } from "react";
import { StickyWrapper } from "@/components/sticky-wrapper";
import Account from "../../../components/settings/account";
import Support from "../../../components/settings/support";
import LogoutButton from "../../../components/settings/logout-button";

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
            <LogoutButton />
        </StickyWrapper>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
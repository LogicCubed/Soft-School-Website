"use client";

import { useState, useEffect } from "react";
import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { MobileFooterItem } from "./mobile-footer-item";

export const MobileAdminFooter = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center h-16 px-2">
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/admin/dashboard" iconSrc="/admin.svg" label="Dashboard" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/admin/curriculum" iconSrc="/curriculum.svg" label="Curriculum" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/learn" iconSrc="/learn.svg" label="Soft School" />
        </div>

        <div className="flex flex-1 justify-center">
          {isClient ? <UserButton /> : <Loader className="h-6 w-6 text-muted-foreground animate-spin" />}
        </div>
      </div>
    </nav>
  );
};
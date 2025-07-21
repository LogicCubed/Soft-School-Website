"use client";

import { useIsAdmin } from "@/hooks/useIsAdmin";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { MobileFooterItem } from "./mobile-footer-item";

export const MobileFooter = () => {
  const { isAdmin, isLoaded } = useIsAdmin();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center h-16 px-2">
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/learn" iconSrc="/learn.svg" label="Learn" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/puzzle" iconSrc="/puzzle.svg" label="Puzzles" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/games" iconSrc="/games.svg" label="Games" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/leaderboard" iconSrc="/leaderboard.svg" label="Leaderboard" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/shop" iconSrc="/shop.svg" label="Shop" />
        </div>

        {isLoaded && isAdmin && (
          <div className="flex flex-1 justify-center">
            <MobileFooterItem href="/admin/dashboard" iconSrc="/admin.svg" label="Admin" />
          </div>
        )}

        <div className="flex flex-1 justify-center">
          <ClerkLoading>
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </div>
      </div>
    </nav>
  );
};
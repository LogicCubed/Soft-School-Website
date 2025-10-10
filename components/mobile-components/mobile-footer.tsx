"use client";

import { MobileFooterItem } from "./mobile-footer-item";

export const MobileFooter = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
      <div className="flex items-center h-16 px-2">
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/learn" iconSrc="/learn.svg" label="Learn" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/puzzles" iconSrc="/puzzle.svg" label="Puzzles" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/games" iconSrc="/games.svg" label="Games" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/shop" iconSrc="/shop.svg" label="Shop" />
        </div>
        <div className="flex flex-1 justify-center">
          <MobileFooterItem href="/profile" iconSrc="/profile.svg" label="Profile" />
        </div>
      </div>
    </nav>
  );
};
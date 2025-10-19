"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div className={cn(
      "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 border-slate-500 flex-col",
      className,
    )}>
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/softy-assets/softyhappy.svg" height={40} width={40} alt="Logo" />
          <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
            Soft School
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem label="Learn" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem label="Puzzles" href="/puzzles" iconSrc="/puzzle.svg" />
        <SidebarItem label="Games" href="/games" iconSrc="/games.svg" />
        <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
        <SidebarItem label="Profile" href="/profile" iconSrc="/profile.svg" />
      </div>
      <div className="flex flex-col mb-4">
        <SidebarItem label="Settings" href="/settings" iconSrc="/settings.svg" />
      </div>
    </div>
  );
};
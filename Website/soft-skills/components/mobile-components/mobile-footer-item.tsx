"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  iconSrc: string;
  href: string;
  label: string;
};

export const MobileFooterItem = ({ iconSrc, href, label }: Props) => {
  const pathname = usePathname();

  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="p-0 w-[56px] h-[56px] flex items-center justify-center"
      asChild
    >
      <Link href={href} aria-label={label}>
        <Image
          src={iconSrc}
          alt={label}
          width={28}
          height={28}
          className="pointer-events-none"
        />
      </Link>
    </Button>
  );
};
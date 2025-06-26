"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    label: string;
    iconSrc: string;
    href: string;
};

export const SidebarItem = ({
    label,
    iconSrc,
    href,
}: Props) => {
    const pathname = usePathname();

    /* There's definitely a better way to do this but for some reason
    I'm struggling to get it to work since curriculum and the admin homepage
    share the same href*/
    let active = false;

    if (href === "/admin") {
        active = pathname === "/admin";
    } else if (href === "/admin/curriculum") {
        active = pathname.startsWith("/admin/curriculum");
    } else if (href === "/learn") {
        active = pathname === "/learn" || pathname.startsWith("/learn/");
    }

    return (
        <Button
            variant={active ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image
                    src={iconSrc}
                    alt={label}
                    className="mr-5"
                    height={32}
                    width={32}
                />
                {label}
            </Link>
        </Button>
    );
};
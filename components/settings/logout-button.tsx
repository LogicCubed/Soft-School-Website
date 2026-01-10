"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const { signOut } = useClerk();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
        router.push("/");
    };

    return (
        <Button
            variant="danger"
            onClick={handleLogout}
            className="cursor-pointer"
        >
        Log out
        </Button>
    );
}
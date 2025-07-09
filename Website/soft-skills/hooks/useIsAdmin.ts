import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ADMIN_IDS } from "@/lib/constants";

export const useIsAdmin = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      setIsAdmin(ADMIN_IDS.includes(user.id));
    }
  }, [isLoaded, user]);

  return { isAdmin, isLoaded };
};
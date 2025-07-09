import { auth } from "@clerk/nextjs/server";
import { ADMIN_IDS } from "./constants";

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) return false;

  return ADMIN_IDS.includes(userId);
};
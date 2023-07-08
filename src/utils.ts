import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const appName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
export const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const getSsrSession = () => {
  return getServerSession(authOptions);
};

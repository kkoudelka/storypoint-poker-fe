import { redirect } from "next/navigation";
import React from "react";
import LoginComponent from "./login-component";
import { getSsrSession } from "@/src/utils";

export const metadata = {
  title: "Login",
  description: "Login to your existing account",
};

export default async function LoginPage() {
  const session = await getSsrSession();

  if (session) {
    redirect("/");
  }

  return <LoginComponent />;
}

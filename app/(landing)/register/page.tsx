import { redirect } from "next/navigation";
import React from "react";
import RegisterComponent from "./register-component";
import { getSsrSession } from "@/src/utils";

export default async function LoginPage() {
  const session = await getSsrSession();

  if (session) {
    redirect("/");
  }

  return <RegisterComponent />;
}

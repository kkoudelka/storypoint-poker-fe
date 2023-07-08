import { redirect } from "next/navigation";
import React from "react";
import getBoardData from "./getData";
import Board from "./components/board";

export async function generateMetadata({
  params: { code },
}: {
  params: { code: string };
}) {
  const data = await getBoardData(code);
  return {
    title: data?.title,
  };
}

export default async function BoardPage({
  params: { code },
}: {
  params: { code: string };
}) {
  const data = await getBoardData(code);

  if (!data) {
    redirect("/boards");
  }

  return <Board initialData={data} code={code} />;
}

export const revalidate = 0;
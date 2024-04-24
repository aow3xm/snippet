// app/snippets/actions.ts
"use server";
import { db } from "@/db";
import { notFound } from "next/navigation";

export async function findSnippet(id: string) {
  const snippet = await db.snippet.findUnique({
    where: {
      id: +id,
    },
  });
  if (!snippet) {
    notFound();
  }
  return snippet;
}

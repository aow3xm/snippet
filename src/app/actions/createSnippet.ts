"use server";
import { db } from "@/db";

export async function createSnippet(data: { title: string; code: string }) {
  const snippet = await db.snippet.create({
    data,
  });
  return snippet;
}

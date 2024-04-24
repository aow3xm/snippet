"use server";
import { db } from "@/db";
import { Snippet } from "@prisma/client";
import { notFound } from "next/navigation";

export async function createSnippet({
  title,
  code,
}: {
  title: string;
  code: string;
}) {
  const snippet = await db.snippet.create({
    data: { title, code },
  });
  return snippet;
}

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

export async function updateSnippet(snippet: Snippet, code: string) {
  try {
    await db.snippet.update({
      where: { id: snippet.id },
      data: { code },
    });
  } catch (error) {
    notFound();
  }
}

export async function findSnippetByQuery(query: string = "") {
  const snippets = await db.snippet.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    select: {
      title: true,
      id: true,
    },
  });
  return snippets;
}

export async function deleteSnippet(id: number) {
  try {
    await db.snippet.delete({
      where: { id },
    });
  } catch (error) {
    notFound();
  }
}

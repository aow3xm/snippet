"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteSnippet, findSnippet } from "@/actions/actions";
import { useRouter } from "next/navigation";

interface SnippetDetailPageProps {
  params: {
    id: string;
  };
}

interface Snippet {
  id: number;
  title: string;
  code: string;
}

export default function SnippetDetailPage({ params }: SnippetDetailPageProps) {
  const [snippet, setSnippet] = useState({} as Snippet);
  const [copy, setCopy] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchSnippet = async () => {
      const foundSnippet = await findSnippet(params.id);
      setSnippet(foundSnippet);
    };
    fetchSnippet();
  }, [params.id]);

  const copyCode = (code: string) => {
    try {
      navigator.clipboard.writeText(code);
      setCopy(!copy);
    } catch (error) {
      setCopy(false);
    }
  };
  const handlerdeleteSnippet = async (id: number) => {
    await deleteSnippet(id);
    router.push("/");
  };
  return (
    <div className="flex flex-col gap-5 max-w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-4xl">{snippet.title}</h1>
        <div className="text-white space-x-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded"
          >
            Sửa
          </Link>
          <button
            onClick={() => handlerdeleteSnippet(snippet.id)}
            className="px-2 py-1 bg-red-700 hover:bg-red-800 rounded"
          >
            Xóa
          </button>
        </div>
      </div>
      <div className="relative">
        <pre className="bg-gray-300 p-5 rounded-lg whitespace-pre-wrap break-words">
          {snippet.code}
        </pre>
        <button
          onClick={() => copyCode(snippet.code)}
          className="absolute top-2 right-2 font-bold text-blue-700"
        >
          {copy ? "OK" : "Copy"}
        </button>
      </div>
    </div>
  );
}

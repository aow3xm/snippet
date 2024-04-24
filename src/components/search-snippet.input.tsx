"use client";
import { findSnippetByQuery } from "@/actions/actions";
import { Snippet } from "@prisma/client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type SnippetReturn = {
  id: number;
  title: string;
};

export default function SearchSnippetInput() {
  const [snippets, setSnippets] = useState<SnippetReturn[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;

    // Xóa timeout trước đó nếu có
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Tạo một timeout mới để trì hoãn việc gọi hàm findSnippetByQuery
    const newTimeoutId = setTimeout(async () => {
      const foundSnippets = await findSnippetByQuery(query);
      setSnippets(foundSnippets);
    }, 500); // Thời gian trì hoãn là 500ms

    setTimeoutId(newTimeoutId);
  };

  return (
    <div className="z-50">
      <input
        onChange={handleOnchange}
        type="text"
        placeholder="Tìm snippet"
        className="bg-gray-100 w-full px-5 py-2 rounded"
      />
      {snippets?.map((snippet) => (
        <div className="bg-gray-300 rounded px-5 py-2 my-1" key={snippet.id}>
          <Link
            className="w-full text-black"
            href={`/snippets/${snippet.id}`}
          >
            {snippet.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
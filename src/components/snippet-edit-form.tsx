"use client";
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { updateSnippet } from "@/actions/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleOnChange = (value: string = "") => {
    setCode(value);
  };
  const handleOnSubmit = async () => {
    const update =await updateSnippet(snippet, code);
    if (update) alert("Cập nhật thành công!");
    else alert("Cập nhật thất bại!");
  };
  return (
    <>
      <Editor
        height={"70vh"}
        language="typescript"
        theme="vs-dark"
        defaultValue={snippet.code}
        onChange={handleOnChange}
      />
      <button
        onClick={handleOnSubmit}
        className="bg-blue-700 hover:bg-blue-800 duration-300 text-white px-2 py-1 rounded"
      >
        Lưu
      </button>
    </>
  );
}

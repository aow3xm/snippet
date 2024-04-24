"use client";
import { createSnippet } from "@/actions/actions";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

interface SnippetFormData {
  title: string;
  code: string;
}

const CreateNewSnippet = () => {
  const [formData, setFormData] = useState<SnippetFormData>({
    title: "",
    code: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSnippet = await createSnippet(formData);
    router.push(`/snippets/${newSnippet.id}`);
  };

  const createSnippetForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="code" className="block font-bold mb-2">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Tạo snippet
        </button>
      </form>
    );
  };
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">Tạo mới snippet</h1>
      {createSnippetForm()}
    </div>
  );
};

export default CreateNewSnippet;

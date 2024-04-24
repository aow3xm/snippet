import { db } from "@/db";
import Link from "next/link";
import React from "react";

const HomePage: React.FC = async () => {
  const snippets = await db.snippet.findMany();
  const snippetList = () => {
    return (
      <div className="flex flex-col divide-y divide-gray-200">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="flex items-center justify-between py-4 px-6 hover:bg-gray-100 transition-colors duration-300"
          >
            <Link href={`snippets/${snippet.id}`} className="text-blue-500">
              {snippet.title}
            </Link>
            <Link
              href={`/snippets/${snippet.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Xem
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center my-5">
        <h3 className="text-center font-bold text-3xl text-gray-800">
          Danh sách snippet
        </h3>
        <Link href={`/snippets/new`} className="text-blue-500 text-right">
          Tạo snippet
        </Link>
      </div>
      <div className="flex flex-col gap-5">{snippetList()}</div>
    </>
  );
};

export default HomePage;

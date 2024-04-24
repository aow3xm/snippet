import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface EditSnippetProps {
  params: {
    id: string;
  };
}

export default async function EditSnippet(props: EditSnippetProps) {
  const snippet = await db.snippet.findUnique({
    where: { id: +props.params.id },
  });
  if (!snippet) notFound();
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

interface EditSnippetProps {
  params: {
    id: string;
  };
}

export default async function EditSnippet(props: EditSnippetProps) {
  return <>edit page {props.params.id}</>;
}

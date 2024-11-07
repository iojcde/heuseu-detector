import { UndoForm } from "./undoform";

async function UndoPage({ searchParams }: any) {
  const { id } = await searchParams;

  return <UndoForm id={id} />;
}

export default UndoPage;

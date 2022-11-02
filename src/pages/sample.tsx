import NotesForm from "../components/notes/form";
import NotesList from "../components/notes/list";

export default function SamplePage() {
  return (
    <div>
      Sample page
      <NotesList />
      <NotesForm />
    </div>
  );
}

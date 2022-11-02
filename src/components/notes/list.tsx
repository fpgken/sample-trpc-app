import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function NotesList() {
  const [search, setSearch] = useState("");
  // const { data } = trpc.note.getAll.useQuery();
  const { data } = trpc.note.getAllWithSearch.useQuery({
    search,
  });
  console.log(search);
  return (
    <div className="mx-auto max-w-xl">
      <h2>Notes</h2>
      <p>List of notes here</p>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
        className="w-full border py-1 px-2"
      />
      {data?.map((note) => {
        return (
          <div key={note.id} className="border-b border-t p-2">
            <h2 className="font-medium">{note.title}</h2>
            <p className="text-sm font-light">{note.content}</p>
          </div>
        );
      })}
    </div>
  );
}

import { Status } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

export default function NotesForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const utils = trpc.useContext();

  const create = trpc.note.create.useMutation({
    onSuccess: () => {
      setForm({
        title: "",
        content: "",
      });
      // invalidate the query to update the list
      utils.note.getAllWithSearch.invalidate();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(form);
        create.mutate(form);
      }}
      className="mx-auto max-w-xl"
    >
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          name="title"
          className="border"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="content">Content</label>
        <textarea
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          name="content"
          className="border"
        />
      </div>
      <div>
        <select>
          {Object.keys(Status).map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="mt-2">
        <button className="rounded bg-blue-400 px-2 py-1" type="submit">
          Save
        </button>
      </div>
    </form>
  );
}

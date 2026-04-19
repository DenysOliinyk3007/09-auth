
import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"

export const metadata: Metadata = {
    title: "Create new note in Notehub",
    description: "Use this function to create a new note with defined tag in NoteHub",
    openGraph: {
        title: "Create new note in Notehub",
        description: "Use this function to create a new note with defined tag in NoteHub",
      url: 'http://localhost:3000/notes/action/create',
      images:
      [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1500,
          height: 1000,
          alt: 'NoteHub logo',
        },
      ],
    }
  };



const CreateNote = () => {
    return (
        <main className={css.main}>
          <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm />
          </div>
        </main>
      )
}

export default CreateNote;
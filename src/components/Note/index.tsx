import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAuth, LoginStatus } from "../Login/authslice";
import { submitNote, NoteStatus } from "../../api/note";
import styles from "./Note.module.css";

export function Note() {
  const auth = useAppSelector(selectAuth);
  const [editNote, setEditNote] = useState<boolean | null>(null);

  if (auth.status !== LoginStatus.LOGGED_IN) {
    return null;
  }

  const {
    apiToken,
    user: { id: userId, note },
  } = auth;

  return (
    <div className={styles.container}>
      {!!note && !editNote && (
        <ShowNote note={note} setEditNote={setEditNote} />
      )}

      {(!note || editNote) && (
        <EditNote note={note} userId={userId} apiToken={apiToken} />
      )}
    </div>
  );
}

type ShowNoteProps = {
  note: string;
  setEditNote: React.Dispatch<React.SetStateAction<boolean | null>>;
};
const ShowNote: React.FC<ShowNoteProps> = ({ note, setEditNote }) => (
  <>
    <div className={styles.note}>{note}</div>
    <button className={styles.noteButton} onClick={() => setEditNote(true)}>
      Edit note 📝
    </button>
  </>
);

type EditNoteProps = {
  userId: string;
  apiToken: string;
  note?: string;
};
const EditNote: React.FC<EditNoteProps> = ({ note, userId, apiToken }) => {
  const [newNote, setNewNote] = useState<string>(note ? note : "");
  const [tooLong, setTooLong] = useState<boolean>();
  const [status, setStatus] = useState<NoteStatus>(NoteStatus.IDLE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // yes, I could have used redux here but it probably would have been overkill
    // for an application of this scale; I'd prefer something like swr
    // of possibly react query depending on requirements
    setStatus(NoteStatus.SENDING);
    try {
      await submitNote({ userId, apiToken, note: newNote });
    } catch (e) {
      setStatus(NoteStatus.ERROR);
      throw new Error("Error sending note");
    }

    setStatus(NoteStatus.SENT);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // set arbitary length limit
    if (e.target.value?.length < 700) {
      if (tooLong) setTooLong(false);
      setNewNote(e.target.value);
    }

    if (e.target.value?.length >= 700) setTooLong(true);
  };

  return (
    <>
      <form className={styles.noteForm} onSubmit={handleSubmit}>
        <textarea
          placeholder="Note goes here..."
          autoFocus
          required
          rows={7}
          onChange={handleChange}
          value={newNote}
        />
        <button
          className={styles.noteButton}
          type="submit"
          disabled={status === NoteStatus.SENDING}
        >
          Save note 📝
        </button>
      </form>

      {/* If I had more time I'd probably implement a toast */}
      {tooLong && (
        <div className={styles.ariaLive} role="status" aria-live="polite">
          Too long
        </div>
      )}

      {status === NoteStatus.ERROR && (
        <div className={styles.ariaLive} role="status" aria-live="polite">
          Error sending note :(
        </div>
      )}
    </>
  );
};

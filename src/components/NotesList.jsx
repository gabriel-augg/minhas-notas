import NoNote from "./NoNote";
import Note from "./Note";

export default function NotesList({ notes }) {
    return false ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {notes.map((note) => {
                return (
                    <Note
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        description={note.description}
                        tag={note.tag}
                        pinned={note.pinned}
                    />
                );
            })}
        </div>
    ) : (
        <NoNote />
    );
}

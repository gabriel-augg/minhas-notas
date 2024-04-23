import Note from "./Note"

export default function NotesList({notes}){
    return notes.map((note) => {
        return(
            <Note
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                tag={note.tag}
                pinned={note.pinned}
            />
        )
    })
}
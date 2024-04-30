import { createContext, useState } from "react";

export const NoteContext = createContext()

export function NoteProvider({children}){
    const [notes, setNotes] = useState([])
    const [isCreation, setIsCreation] = useState(false)
    const [currentNote, setCurrentNote] = useState({
        pinned: false,
        title: "",
        description: "",
        tag: ""
    })


    function addNewNote(note){
        if(note.pinned){
            setNotes(prevNotes => [note, ...prevNotes])
        } else {
            setNotes(prevNotes => {
                const pinnedNotes = prevNotes.filter(note => note.pinned);
                const otherNotes = prevNotes.filter(note => !note.pinned);

                const updatedNotes = [...pinnedNotes, note, ...otherNotes, ];

                return updatedNotes;
              });
        }
    }


    return(
        <NoteContext.Provider value={{ notes, currentNote, isCreation, setNotes, setCurrentNote, setIsCreation, addNewNote }}>
            {children}
        </NoteContext.Provider>
    )
}
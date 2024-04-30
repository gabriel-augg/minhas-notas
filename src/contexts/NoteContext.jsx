import { createContext, useState } from "react";

export const NoteContext = createContext()


export function NoteProvider({children}){
    const [currentNote, setCurrentNote] = useState({
        pinned: false,
        title: "",
        description: "",
        tag: ""
    })
    const [isCreation, setIsCreation] = useState(false)
    const [newNote, setNewNote] = useState(null)

    return(
        <NoteContext.Provider value={{ currentNote, isCreation, newNote, setIsCreation, setNewNote, setCurrentNote }}>
            {children}
        </NoteContext.Provider>
    )
}
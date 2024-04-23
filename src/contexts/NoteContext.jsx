import { createContext, useState } from "react";

export const NoteContext = createContext()


export function NoteProvider({children}){
    const [id, setId] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [pinned, setPinned] = useState(false)
    const [tag, setTag] = useState("")
    const [add, setAdd] = useState(false)
    const [newNote, setNewNote] = useState(null)

    return(
        <NoteContext.Provider value={{ id, title, description, pinned, tag, add, newNote, setTitle, setDescription, setPinned, setTag, setAdd, setId, setNewNote }}>
            {children}
        </NoteContext.Provider>
    )
}
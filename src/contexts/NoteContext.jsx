
import { useForm } from "react-hook-form";
import { createContext, useState } from "react";

export const NoteContext = createContext()


export function NoteProvider({children}){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [pinned, setPinned] = useState(false)
    const [tag, setTag] = useState("")

    return(
        <NoteContext.Provider value={{ title, description, pinned, tag, setTitle, setDescription, setPinned, setTag }}>
            {children}
        </NoteContext.Provider>
    )
}
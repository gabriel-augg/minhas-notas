import { createContext, useState } from "react";

export const NoteContext = createContext()

export function NoteProvider({children}){
    const [notes, setNotes] = useState([])
    const [isCreation, setIsCreation] = useState(false)
    const [currentModalValues, setCurrentModalValues] = useState({
        pinned: false,
        title: "",
        description: "",
        tag: ""
    })


    return(
        <NoteContext.Provider value={{ notes, currentModalValues, isCreation, setNotes, setCurrentModalValues, setIsCreation }}>
            {children}
        </NoteContext.Provider>
    )
}
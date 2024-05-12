import { createContext, useState } from "react";

export const NoteContext = createContext();

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] = useState(false);
    const [noteModalValues, setNoteModalValues] = useState({
        id: "",
        pinned: false,
        title: "",
        description: "",
        tag: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    return (
        <NoteContext.Provider
            value={{
                notes,
                noteModalValues,
                isCreateNoteModalOpen,
                isLoading,
                setNotes,
                setNoteModalValues,
                setIsCreateNoteModalOpen,
                setIsLoading,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}

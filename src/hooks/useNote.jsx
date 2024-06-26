import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import useRequest from "./useRequest";
import generateID from "../utils/generateID";

/// ATENÇÃO: O código possui um sistema de loading implementado no projeto.
/// Se a API estiver hospedada no localhost, o loading não será exibido.
/// Se quiser testar o loading, hospede a API em um servidor externo 
/// ou então implemente um delay nas requisições.


const useNote = () => {
    const { noteModalValues, setNotes, setLoadingNote, setNoteModalValues } =
        useContext(NoteContext);
    const { request } = useRequest();

    const showNoteModal = () => {
        document.getElementById("my_modal_2").showModal();
    };

    const closeNoteModal = () => {
        document.getElementById("my_modal_2").close();
    };

    const clearNoteModalValues = () => {
        setNoteModalValues({
            id: "",
            pinned: false,
            title: "",
            description: "",
            tag: "",
            createdAt: "",
            updatedAt: "",
        });
    };

    const createNote = async () => {
        setLoadingNote(true);
        const newNote = {
            ...noteModalValues,
            id: generateID(),
        };

        if (newNote.pinned) {
            setNotes((prevNotes) => [newNote, ...prevNotes]);
        } else {
            setNotes((prevNotes) => {
                const pinnedNotes = prevNotes.filter((note) => note.pinned);
                const otherNotes = prevNotes.filter((note) => !note.pinned);
                return [...pinnedNotes, newNote, ...otherNotes];
            });
        }

        closeNoteModal();

        await request("/notes/create", {
            method: "post",
            data: newNote,
        });

        setLoadingNote(false);
    };

    const updateNote = async () => {
        setLoadingNote(true);
        const noteId = noteModalValues.id;

        const updatedNote = noteModalValues;

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === noteId) {
                    return { ...note, ...updatedNote };
                }
                return note;
            });

            const pinnedNoteIndex = updatedNotes.findIndex(
                (note) => note.id === noteId && updatedNote.pinned
            );

            if (pinnedNoteIndex !== -1) {
                const pinnedNote = updatedNotes.splice(pinnedNoteIndex, 1)[0];
                updatedNotes.unshift(pinnedNote);
            }

            return updatedNotes;
        });

        closeNoteModal();

        await request(`/notes/${noteId}/update`, {
            method: "put",
            data: updatedNote,
        });

        setLoadingNote(false);
    };

    const deleteNote = async () => {
        setLoadingNote(true);
        const noteId = noteModalValues.id;

        setNotes((prevNotes) => {
            const notes = prevNotes.filter((note) => note.id !== noteId);
            return [...notes];
        });

        closeNoteModal();

        await request(`/notes/${noteId}/delete`, {
            method: "delete",
        });

        setLoadingNote(false);
    };

    return {
        createNote,
        updateNote,
        deleteNote,
        clearNoteModalValues,
        showNoteModal,
    };
};

export default useNote;

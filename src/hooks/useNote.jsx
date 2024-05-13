import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import useRequest from "./useRequest";
import generateID from "../utils/generateID";

const useNote = () => {
    const { noteModalValues, setNotes, setLoadingNote, setNoteModalValues } =
        useContext(NoteContext);
    const { request } = useRequest();

    const closeNoteModal = () => {
        document.getElementById("my_modal_2").close();
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

        const currentNote = noteModalValues;

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === noteId) {
                    return { ...note, ...currentNote };
                }
                return note;
            });

            const pinnedNoteIndex = updatedNotes.findIndex(
                (note) => note.id === noteId && currentNote.pinned
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
            data: currentNote,
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

    return {
        createNote,
        updateNote,
        deleteNote,
        clearNoteModalValues,
        closeNoteModal,
    };
};

export default useNote;

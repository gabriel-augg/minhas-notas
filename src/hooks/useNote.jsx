import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import useRequest from "./useRequest";
import generateID from "../utils/generateID";

const useNote = () => {
    const { noteModalValues, setNotes, setIsLoading, setNoteModalValues } =
        useContext(NoteContext);
    const { request } = useRequest();

    function closeNoteModal() {
        document.getElementById("my_modal_2").close();
    }

    async function createNote() {

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

        await request("/notes/create", {
            method: "post",
            data: newNote,
        });
    }

    async function updateNote() {
        const id = noteModalValues.id;

        const currentNote = noteModalValues;

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === currentNote.id) {
                    return { ...note, ...currentNote };
                }
                return note;
            });

            const pinnedNoteIndex = updatedNotes.findIndex(
                (note) =>
                    note.id === currentNote.id && currentNote.pinned
            );

            if (pinnedNoteIndex !== -1) {
                const pinnedNote = updatedNotes.splice(pinnedNoteIndex, 1)[0];
                updatedNotes.unshift(pinnedNote);
            }

            return updatedNotes;
        });

        await request(`/notes/${id}/update`, {
            method: "put",
            data: currentNote,
        });
    }

    async function deleteNote() {
        setIsLoading(true);
        const id = noteModalValues.id;

        setNotes((prevNotes) => {
            const notes = prevNotes.filter(
                (note) => note.id !== noteModalValues.id
            );
            return [...notes];
        });

        closeNoteModal();

        await request(`/notes/${id}/delete`, {
            method: "delete",
        });

        setIsLoading(false);
    }

    function clearNoteModalValues() {
        setNoteModalValues({
            id: "",
            pinned: false,
            title: "",
            description: "",
            tag: "",
            createdAt: "",
            updatedAt: "",
        });
    }

    return {
        createNote,
        updateNote,
        deleteNote,
        clearNoteModalValues,
        closeNoteModal,
    };
};

export default useNote;

import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { TagContext } from "../contexts/TagContext";
import useRequest from "./useRequest";

const useNote = () => {
    const { noteModalValues, setNotes, setIsLoading, setNoteModalValues } =
        useContext(NoteContext);
    const { request } = useRequest();

    async function createNote() {
        if (noteModalValues.pinned) {
            setNotes((prevNotes) => [noteModalValues, ...prevNotes]);
        } else {
            setNotes((prevNotes) => {
                const pinnedNotes = prevNotes.filter((note) => note.pinned);
                const otherNotes = prevNotes.filter((note) => !note.pinned);
                return [...pinnedNotes, noteModalValues, ...otherNotes];
            });

            await request("/notes/create", {
                method: "post",
                data: noteModalValues,
            });
        }
    }

    async function updateNote() {
        const id = noteModalValues.id;
        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((note) => {
                if (note.id === noteModalValues.id) {
                    return { ...note, ...noteModalValues };
                }
                return note;
            });

            const pinnedNoteIndex = updatedNotes.findIndex(
                (note) =>
                    note.id === noteModalValues.id && noteModalValues.pinned
            );

            if (pinnedNoteIndex !== -1) {
                const pinnedNote = updatedNotes.splice(pinnedNoteIndex, 1)[0];
                updatedNotes.unshift(pinnedNote);
            }

            return updatedNotes;
        });

        await request(`/notes/${id}/update`, {
            method: "put",
            data: noteModalValues,
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

        document.getElementById("my_modal_2").close();

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

    function closeNoteModal() {
        document.getElementById("my_modal_2").close();
    }

    return { createNote, updateNote, deleteNote, clearNoteModalValues, closeNoteModal };
};

export default useNote;

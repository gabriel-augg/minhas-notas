import { useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

import NoteModal from "../components/NoteModal";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { NoteContext } from "../contexts/NoteContext";
import NotesList from "../components/NotesList";
import TagsList from "../components/TagsList";
import { UserContext } from "../contexts/UserContext";
import { TagContext } from "../contexts/TagContext";
import TagModal from "../components/TagModal";
import LoadingContent from "../components/LoadingContent";

export default function Home() {
    const { request } = useRequest();
    const {notes, setNotes, setIsCreateNoteModalOpen, setNoteModalValues, isLoading } =
        useContext(NoteContext);
    const { tags, setTags, setIsCreateTagModalOpen, setTagModalValues } =
        useContext(TagContext);
    const { authenticated } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNotes() {
            const [notesResponse, tagsResponse] = await Promise.all([
                request("/notes", {
                    method: "get",
                }),
                request("/tags", {
                    method: "get",
                }),
            ]);

            setNotes(notesResponse.data.notes);
            setTags(tagsResponse.data.tags);
            setLoading(false);
        }

        if (authenticated) fetchNotes();
    }, [authenticated]);

    function handleAddNote() {
        setIsCreateNoteModalOpen(true);
        setNoteModalValues({
            id: "",
            pinned: false,
            title: "",
            description: "",
            tag: "",
            createdAt: "",
            updatedAt: "",
        });
        document.getElementById("my_modal_2").showModal();
    }

    function handleAddTag() {
        setIsCreateTagModalOpen(true);
        setTagModalValues({
            id: "",
            name: "",
        });
        document.getElementById("my_modal_3").showModal();
    }

    return (
        <section className="min-h-screen w-3/4 mx-auto">
            <NoteModal />
            <TagModal />
            <main className="pt-32">
                <h1 className="text-3xl font-bold text-black">Notas</h1>

                <div className="flex justify-end items-center my-4">
                    <div className="flex items-center gap-3">
                        {isLoading && (
                            <span className="loading loading-spinner loading-sm bg-lime-700"></span>
                        )}
                        <div className="dropdown dropdown-hover ">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold px-2"
                            >
                                <FaTags size={18} />
                                Tags
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] p-2 shadow bg-lime-900 text-white rounded-box w-52"
                            >
                                <li>
                                    <button
                                        onClick={handleAddTag}
                                        className="flex items-center w-full bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold p-0.5 px-2"
                                    >
                                        <IoIosAddCircle size={15} />
                                        Adicionar
                                    </button>
                                </li>
                                <TagsList tags={tags} />
                            </ul>
                        </div>
                        <button
                            onClick={handleAddNote}
                            className="flex items-center bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold px-2"
                        >
                            <RiStickyNoteAddFill size={18} />
                            Adicionar
                        </button>
                    </div>
                </div>

                {loading ? <LoadingContent /> : <NotesList notes={notes} />}
            </main>
        </section>
    );
}

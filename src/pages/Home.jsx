import { useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";


import Modal from "../components/Modal"
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { NoteContext } from "../contexts/NoteContext";
import NotesList from "../components/NotesList";
import TagsList from "../components/TagsList";
import { UserContext } from "../contexts/UserContext";
import NoNote from "../components/NoNote";
import { TagContext } from "../contexts/TagContext";
import TagModal from "../components/TagModal";


export default function Home() {
    const { request } = useRequest()
    const { notes, setNotes, setIsCreation, setCurrentModalValues, isLoading } = useContext(NoteContext)
    const { tags, setTags, setIsCreateTagModalOpen, setCurrentTagModalValues } = useContext(TagContext)
    const { authenticated } = useContext(UserContext)
    const [loading, setLoading] = useState(true)


    useEffect(()=>{
        async function fetchNotes(){

            const [notesResponse, tagsResponse] = await Promise.all([
                request("/notes/get-notes", {
                    method: "get"
                }),
                request("/tags/get-tags", {
                    method: "get"
                })
            ]);

            
            setNotes(notesResponse.data.notes);
            setTags(tagsResponse.data.tag);
            setLoading(false)
        }

        authenticated && fetchNotes()

    },[authenticated])

    function handleAddNote(){
        setIsCreation(true)
        setCurrentModalValues({
            id: "",
            pinned: false,
            title: "",
            description: "",
            tag: "",
            createdAt: "",
            updatedAt: ""
        })
        document.getElementById('my_modal_2').showModal()
    }

    function handleAddTag(){
        setIsCreateTagModalOpen(true)
        setCurrentTagModalValues({
            id: "",
            title: ""
        })
        document.getElementById('my_modal_3').showModal()
    }


    return (
        <section className="min-h-screen w-3/4 mx-auto my-7">
            <h1 className="text-3xl font-bold text-black">Notas</h1>
            <Modal />
            <TagModal />
            <div className="flex justify-between items-center my-4">
                <div className="flex items-center gap-4">
                    { isLoading && (
                        <span className="loading loading-spinner loading-sm bg-lime-700"></span>
                    ) }

                </div>
                <div className="flex items-center gap-3">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold px-2">
                            <FaTags size={18} />
                            Tags
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li>
                                <button onClick={handleAddTag} className="flex items-center w-full bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold p-0.5 px-2">
                                    <IoIosAddCircle size={15} />
                                    Adicionar
                                </button>
                            </li>
                            <TagsList tags={tags} />

                        </ul>
                    </div>
                    <button onClick={handleAddNote} className="flex items-center bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold px-2">
                        <RiStickyNoteAddFill size={18} />
                        Adicionar
                    </button>
                </div>
            </div>

            { loading ? (
                <div className="mt-32 flex justify-center">
                    <span className="loading loading-bars bg-lime-200 loading-lg"></span>
                </div>
            ) : notes.length > 0 ? (
                <NotesList notes={notes} />
            ) : (
                <NoNote />
            ) }


        </section>
    )
}
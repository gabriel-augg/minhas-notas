import { useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";


import Modal from "../components/Modal"
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { NoteContext } from "../contexts/NoteContext";
import NotesList from "../components/NotesList";
import TagsList from "../components/TagsList";
import { UserContext } from "../contexts/UserContext";
import NoNote from "../components/NoNote";


export default function Home() {
    const { request } = useRequest()
    const { notes, setNotes, setIsCreation, setCurrentModalValues, isLoading } = useContext(NoteContext)
    const { authenticated } = useContext(UserContext)


    const tags = [
        {id: 1, title: "faculdade"},
        {id: 2, title: "trabalho"},
        {id: 3, title: "trabalho trabalho trabalho"}
    ]

    useEffect(()=>{
        async function fetchNotes(){
            const response = await request("/notes/get-notes", {
                method: "get"
            })

            setNotes(response.data.notes)
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



    return (
        <section className="min-h-screen w-3/4 mx-auto my-7">
            <h1 className="text-3xl font-bold text-black">Notas</h1>
            <Modal />
            <div className="flex justify-between items-center my-4">
                <div className="flex items-center gap-4">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold px-2">
                            <FaSort size={20}/>
                            Ordenar
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>
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
                                <button className="flex items-center w-full bg-lime-500 hover:bg-lime-700 text-white gap-1 rounded-xl font-bold p-0.5 px-2">
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
            { notes.length > 0 ? (
                <NotesList notes={notes} />
            ) : (
                <NoNote />
            )}

        </section>
    )
}
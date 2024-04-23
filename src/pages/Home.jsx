import { useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

import Modal from "../components/Modal"
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import { NoteContext } from "../contexts/NoteContext";
import NotesList from "../components/NotesList";


export default function Home() {
    const [notes, setNotes] = useState([])
    const { request } = useRequest()
    const { setTitle, setDescription, setTag, setPinned, setAdd, newNote } = useContext(NoteContext)

    useEffect(()=>{
        request("/notes/get-notes", {
            method: "get"
        })
        .then(({data}) => {
            setNotes(data.notes)
        })
    },[])

    useEffect(()=>{
        if(newNote !== null){
            if(newNote.pinned){
                setNotes(prevNotes => [newNote, ...prevNotes])
            } else {
                setNotes(prevNotes => {
                    const pinnedNotes = prevNotes.filter(note => note.pinned);
                    const otherNotes = prevNotes.filter(note => !note.pinned);

                    const updatedNotes = [...pinnedNotes, newNote, ...otherNotes, ];

                    return updatedNotes;
                  });
            }
        }
    },[newNote])

    function handleAddNote(){
        setAdd(true)
        setTitle("")
        setDescription("")
        setTag("")
        setPinned(false)
        document.getElementById('my_modal_2').showModal()
    }



    return (
        <section className="min-h-screen w-3/4 mx-auto my-7">
            <h1 className="text-3xl font-bold text-black">Notas</h1>
            <Modal />
            <div className="flex justify-between items-center my-4">
                <div>
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-0.5 px-2">
                            <FaSort size={20}/>
                            Ordenar
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>

                </div>
                <div className="flex items-center gap-3">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-0.5 px-2">
                            <FaTags size={18} />
                            Tags
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>
                    <button onClick={handleAddNote} className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-0.5 px-2">
                        <RiStickyNoteAddFill size={18} />
                        Adicionar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NotesList notes={notes} />
            </div>
        </section>
    )
}
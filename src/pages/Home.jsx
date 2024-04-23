import { useContext, useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";

import Modal from "../components/Modal"
import Note from "../components/Note"
import { RiStickyNoteAddFill } from "react-icons/ri";
import { FaTags } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";
import { NoteContext } from "../contexts/NoteContext";


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

                setNotes([newNote, ...notes])
            } else {
                setNotes(prevNotes => [...prevNotes, newNote])
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
            <div className="flex justify-between my-4">
                <div>
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                            <FaSort size={20}/>
                            Ordenar
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>

                </div>
                <div className="flex gap-3">
                    <div className="dropdown dropdown-hover">
                        <div tabIndex={0} role="button" className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                            <FaTags size={18} />
                            Tags
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-52">
                            <li><a>Faculdade</a></li>
                            <li><a>Trabalho</a></li>
                        </ul>
                    </div>
                    <button onClick={handleAddNote} className="flex items-center bg-lime-500 text-white gap-1 rounded-xl font-bold p-1 px-2">
                        <RiStickyNoteAddFill size={18} />
                        Adicionar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                { notes.length > 0 ? (
                    notes.map((note) => {
                        return(
                            <Note
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                description={note.description}
                                tag={note.tag}
                                pinned={note.pinned}
                            />
                        )
                    })
                ) : (
                    <h1>Carregando...</h1>
                ) }
            </div>
        </section>
    )
}
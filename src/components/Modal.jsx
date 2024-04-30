
import useRequest from "../hooks/useRequest";
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { FaTrash } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";

import { IoMdPricetags } from "react-icons/io";


export default function Modal() {
    const { isCreation, currentModalValues, setCurrentModalValues, setNotes, setIsLoading } = useContext(NoteContext)
    const { request } = useRequest()


    async function createNote() {
        const response = await request("/notes/create", {
            method: "post",
            data: currentModalValues
        });
    
        const note = response.data.note;
    
        if (note.pinned) {
            setNotes(prevNotes => [note, ...prevNotes]);
        } else {
            setNotes(prevNotes => {
                const pinnedNotes = prevNotes.filter(note => note.pinned);
                const otherNotes = prevNotes.filter(note => !note.pinned);
                const updatedNotes = [...pinnedNotes, note, ...otherNotes];
                return updatedNotes;
            });
        }
    
    }
    
    async function updateNote() {
        const response = await request(`/notes/update/${currentModalValues.id}`, {
            method: "put",
            data: currentModalValues
        });
    
        const updatedNote = response.data.note;
    
        setNotes(prevValues => {
            return prevValues.map(note => {
                if (note.id === updatedNote.id) {
                    return { ...note, ...updatedNote };
                }
                return note;
            });
        });
    }

    async function deleteNote(){
        setIsLoading(true)
        await request(`/notes/delete/${currentModalValues.id}`, {
            method: "delete"
        })

        setNotes(prevNotes => {
            const notes = prevNotes.filter(note => note.id !== currentModalValues.id);
            return [...notes];
        });

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        document.getElementById('my_modal_2').close()
    }


    async function handleOnSubmit(e) {
        setIsLoading(true)
        e.preventDefault()
        if(isCreation) {
            await createNote();
        } else {
            await updateNote();
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        document.getElementById('my_modal_2').close()
    }


    function handleInput(e){
        setCurrentModalValues(prevValues => ({
            ...prevValues,
            [e.target.name]: e.target.value
        }))
    }

    function handlePinned(){
        setCurrentModalValues(prevValues => ({
            ...prevValues,
            pinned: !prevValues.pinned
        }))
    }

    return (
        <dialog id="my_modal_2" className="modal">
            <form onSubmit={handleOnSubmit} className="modal-box bg-lime-200">
                <div className="flex">
                    <input
                        type="text"
                        className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none"
                        name="title"
                        placeholder="Título"
                        value={currentModalValues.title}
                        onChange={handleInput}
                    />
                    <button className="hover:bg-lime-100 p-1 rounded-full" type="button" onClick={handlePinned}>
                        {currentModalValues.pinned ? (
                            <RiPushpin2Fill className="text-lime-800" size={30} />
                        ) : (
                            <RiPushpin2Line className="text-lime-800" size={30} />
                        )}
                    </button>
                </div>

                <textarea
                    type="text"
                    name="description"
                    value={currentModalValues.description}
                    onChange={handleInput}
                    placeholder="Nota"
                    className="bg-transparent placeholder-lime-700 py-4 text-black w-full resize-none outline-none overflow-hidden"
                />
                <div className="flex mt-5 justify-between">
                    {/* <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center px-2 text-white pointer-events-none">
                            <IoMdPricetags size={18} />
                        </div>
                        <select className="block appearance-none pl-8 py-1 bg-lime-500 text-white cursor-pointer rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Tags</option>
                            <option>Opção 2</option>
                            <option>Opção 3</option>
                        </select>
                    </div> */}

                    <div className="relative">
                        <select className="block appearance-none w-full bg-lime-500 text-white cursor-pointer rounded-xl  px-3 py-1 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Tags</option>
                            <option>Opção 2</option>
                            <option>Opção 3</option>
                        </select>
                        <div className="pointer-events-none text-white absolute inset-y-0 right-0 flex items-center px-2 ">
                            <IoMdPricetags size={18} />
                        </div>
                    </div>



                    <div className="flex items-center gap-4">
                        {!isCreation && (
                            <button type="button" onClick={deleteNote} className="hover:bg-red-100 p-2 rounded-full">
                                <FaTrash className="text-red-30 text-red-400 transition-all duration-100" size={20} />
                            </button>
                        )}

                        <button type="submit" className="bg-lime-600 p-1 px-3 hover:bg-lime-800 text-white rounded-xl font-bold">Salvar</button>
                    </div>
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

    )
}
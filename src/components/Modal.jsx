
import useRequest from "../hooks/useRequest";
import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { FaTrash } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";

import { IoMdPricetags } from "react-icons/io";


export default function Modal() {
    const { id, title, description, pinned, tag, add, setTitle, setDescription, setPinned, setTag, setNewNote } = useContext(NoteContext)
    const { request } = useRequest()

    function handleOnSubmit(e) {
        e.preventDefault()
        const note = {
            title,
            description,
            tag,
            pinned
        }

        if (add) {
            request("/notes/create", {
                method: "post",
                data: note
            })
                .then(({ data }) => {
                    console.log(data.note)
                    setNewNote(data.note)
                    document.getElementById('my_modal_2').close()
                })
        } else {
            console.log("EDITANDO")
            // aqui ja tem o id
            console.log(id)
            // request("/notes/create", {
            //     method: "post",
            //     data: note
            // })
            // .then((res) => {
            //     document.getElementById('my_modal_2').close()
            // })
            document.getElementById('my_modal_2').close()
        }
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button className="hover:bg-lime-100 p-1 rounded-full" type="button" onClick={() => setPinned(!pinned)}>
                        {pinned ? (
                            <RiPushpin2Fill className="text-lime-800" size={30} />
                        ) : (
                            <RiPushpin2Line className="text-lime-800" size={30} />
                        )}
                    </button>
                </div>

                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nota"
                    className="bg-transparent placeholder-lime-700 py-4 text-black w-full resize-none outline-none overflow-hidden h-auto"
                />
                <div className="flex mt-5 justify-between">
                    {/* <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center px-2 text-white pointer-events-none">
                            <IoMdPricetags size={18} />
                        </div>
                        <select class="block appearance-none pl-8 py-1 bg-lime-500 text-white cursor-pointer rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option>Tags</option>
                            <option>Opção 2</option>
                            <option>Opção 3</option>
                        </select>
                    </div> */}

                    <div class="relative">
                        <select class="block appearance-none w-full bg-lime-500 text-white cursor-pointer rounded-xl  px-3 py-1 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Tags</option>
                            <option>Opção 2</option>
                            <option>Opção 3</option>
                        </select>
                        <div class="pointer-events-none text-white absolute inset-y-0 right-0 flex items-center px-2 ">
                            <IoMdPricetags size={18} />
                        </div>
                    </div>



                    <div className="flex items-center gap-4">
                        {!add && (
                            <button className="hover:bg-red-100 p-2 rounded-full">
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
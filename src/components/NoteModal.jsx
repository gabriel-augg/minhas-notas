import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { FaTrash } from "react-icons/fa6";
import { RiPushpin2Line } from "react-icons/ri";
import { RiPushpin2Fill } from "react-icons/ri";

import { IoMdPricetags } from "react-icons/io";
import { TagContext } from "../contexts/TagContext";
import useNote from "../hooks/useNote";

export default function NoteModal() {
    const {
        isCreateNoteModalOpen,
        noteModalValues,
        setNoteModalValues,
        setLoadingNote,
    } = useContext(NoteContext);

    const { tags } = useContext(TagContext);

    const { createNote, updateNote, deleteNote } = useNote();

    async function handleOnSubmit(e) {
        e.preventDefault();

        if (isCreateNoteModalOpen) {
            await createNote();
        } else {
            await updateNote();
        }
    }

    function handleInput(e) {
        setNoteModalValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    function handlePinned() {
        setNoteModalValues((prevValues) => ({
            ...prevValues,
            pinned: !prevValues.pinned,
        }));
    }

    return (
        <dialog id="my_modal_2" className="modal">
            <form onSubmit={handleOnSubmit} className="modal-box bg-lime-200">
                <div className="flex">
                    <input
                        type="text"
                        className="bg-transparent placeholder-lime-700 text-lg text-black font-bold w-full outline-none p-text-area"
                        name="title"
                        placeholder="Título"
                        value={noteModalValues.title}
                        onChange={handleInput}
                    />
                    <button
                        className="hover:bg-lime-100 p-1 rounded-full"
                        type="button"
                        onClick={handlePinned}
                    >
                        {noteModalValues.pinned ? (
                            <RiPushpin2Fill
                                className="text-lime-800"
                                size={30}
                            />
                        ) : (
                            <RiPushpin2Line
                                className="text-lime-800"
                                size={30}
                            />
                        )}
                    </button>
                </div>

                <textarea
                    type="text"
                    name="description"
                    value={noteModalValues.description}
                    onChange={handleInput}
                    placeholder="Nota"
                    className="bg-transparent placeholder-lime-700 py-4 text-black w-full resize-none outline-none overflow-hidden"
                />
                <div className="flex mt-5 justify-between">
                    <div className="relative">
                        <select
                            className="block appearance-none w-full bg-lime-500 text-white cursor-pointer rounded-xl  px-3 py-1 pr-8 shadow leading-tight focus:outline-none focus:shadow-outline"
                            name="tag"
                            value={noteModalValues.tag}
                            onChange={handleInput}
                        >
                            <option defaultChecked>Tags</option>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.title}>
                                    {tag.title}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none text-white absolute inset-y-0 right-0 flex items-center px-2 ">
                            <IoMdPricetags size={18} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {!isCreateNoteModalOpen && (
                            <button
                                type="button"
                                onClick={deleteNote}
                                className="hover:bg-red-100 p-2 rounded-full"
                            >
                                <FaTrash
                                    className="text-red-30 text-red-400 transition-all duration-100"
                                    size={20}
                                />
                            </button>
                        )}

                        <button
                            type="submit"
                            className="bg-lime-600 p-1 px-3 hover:bg-lime-800 text-white rounded-xl font-bold"
                        >
                            Salvar
                        </button>
                    </div>
                </div>
            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

import { useContext } from "react";
import { NoteContext } from "../contexts/NoteContext";
import { RiPushpin2Fill } from "react-icons/ri";

export default function Note({id, title, description, tag, pinned}){

    const { setTitle, setDescription, setTag, setPinned, setAdd, setId } = useContext(NoteContext)

    function handleShowNote(){
        setId(id)
        setAdd(false)
        setTitle(title)
        setDescription(description)
        setTag(tag)
        setPinned(pinned)

        document.getElementById('my_modal_2').showModal()

    }


    return(
        <article onClick={handleShowNote} className="bg-lime-200 p-4 rounded-xl cursor-pointer border hover:border-lime-500 drop-shadow-md h-fit min-h-28">
            <div className="flex justify-between">
                <h1 className="text-black font-bold text-xl mb-3">{title}</h1>
                {pinned && (
                    <RiPushpin2Fill className="text-lime-800" size={25} />
                )}
            </div>
            {!title && !description && <h1 className="text-lime-700 font-bold text-xl">Nota vazia</h1>}
            <p className="text-black text-md mb-2">{description}</p>

            {tag && (
                <div className="flex justify-end mt-5">
                    <span className="px-3 bg-lime-600 text-white rounded-3xl">{tag}</span>
                </div>
            )}
        </article>
    )
}
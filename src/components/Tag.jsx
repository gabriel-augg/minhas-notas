import { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { TagContext } from "../contexts/TagContext";

export default function Tag({id, title}){
    const { setCurrentTagModalValues, setIsCreateTagModalOpen } = useContext(TagContext)


    function handleShowModal(){
        setIsCreateTagModalOpen(false)

        setCurrentTagModalValues({
            id,
            title
        })

        document.getElementById('my_modal_3').showModal()

    }

    return(
        <li>
            <div className="flex justify-between p-1">
                <button className="font-bold hover:bg-lime-600 px-2 rounded-lg w-full text-start text-sm" onClick={handleShowModal}>{title}</button>
                <button className="p-1 rounded-full hover:bg-red-200">
                    <FaTrash className="text-red-400" size={15} />
                </button>
            </div>   
        </li>
    )
}
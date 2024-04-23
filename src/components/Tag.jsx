import { FaTrash } from "react-icons/fa6";

export default function Tag({id, title}){
    return(
        <li>
            <div className="flex justify-between p-1">
                <button className="font-bold hover:bg-lime-600 px-2 rounded-lg w-full text-start text-sm">{title}</button>
                <button className="p-1 rounded-full hover:bg-red-200">
                    <FaTrash className="text-red-400" size={15} />
                </button>
            </div>   
        </li>
    )
}
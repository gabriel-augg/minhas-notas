import { useContext } from "react";
import { FaTrash } from "react-icons/fa6";
import { TagContext } from "../contexts/TagContext";
import useRequest from "../hooks/useRequest";

export default function Tag({id, title}){
    const { tags, setTags, setCurrentTagModalValues, setIsCreateTagModalOpen } = useContext(TagContext)

    const { request } = useRequest()


    function handleShowModal(){
        setIsCreateTagModalOpen(false)

        setCurrentTagModalValues({
            id,
            title
        })

        document.getElementById('my_modal_3').showModal()

    }

    const deleteTag = async (id) => {
      
        const updatedTags = tags.filter((tag) => tag.id !== id);
    
        setTags(updatedTags);
    
        document.getElementById("my_modal_3").close();
    
        await request(`/tags/delete-tag/${id}`, {
          method: "delete",
        });
      }

    return(
        <li>
            <div className="flex justify-between p-1">
                <button className="font-bold hover:bg-lime-600 px-2 rounded-lg w-full text-start text-sm" onClick={handleShowModal}>{title}</button>
                <button onClick={() => deleteTag(id)} className="p-1 rounded-full hover:bg-red-200">
                    <FaTrash className="text-red-400" size={15} />
                </button>
            </div>   
        </li>
    )
}
import { RiPushpin2Fill } from "react-icons/ri";

export default function xNote({id, title, description, tag, pinned}){
    return(
        <article onClick={()=>document.getElementById('my_modal_2').showModal()} className="bg-lime-200 p-4 rounded-xl cursor-pointer border hover:border-lime-500 drop-shadow-md">
            <div className="flex justify-between">
                <h1 className="text-black font-bold text-xl mb-3">{title}</h1>
                {pinned && (
                    <RiPushpin2Fill className="text-lime-800" size={25} />
                )}
            </div>
            <p className="text-black text-md mb-2">{description}</p>
            {tag && (
                <div className="flex justify-end mt-5">
                    <span className="px-3 bg-lime-600 text-white rounded-3xl">{tag}</span>
                </div>
            )}
        </article>
    )
}
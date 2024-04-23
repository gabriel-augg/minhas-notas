export default function xNote({id, title, description, category}){
    return(
        <article onClick={()=>document.getElementById('my_modal_2').showModal()} className="bg-lime-200 p-4 rounded-xl cursor-pointer border hover:border-lime-500 drop-shadow-md">
            <h1 className="text-black font-bold text-xl mb-3">{title}</h1>
            <p className="text-black text-md mb-2">{description}</p>
            {category && (
                <div className="flex justify-end mt-5">
                    <span className="px-3 bg-lime-600 text-white rounded-3xl">{category}</span>
                </div>
            )}
        </article>
    )
}
export default function xNote({id, title, description, category}){
    return(
        <article className="bg-lime-200 p-4 rounded-xl cursor-pointer drop-shadow-md">
            <h1 className="text-black font-bold text-xl mb-3">{title}</h1>
            <p className="text-black text-md mb-2">{description}</p>
            {category && (
                <div className="flex justify-end">
                    <span className="p-1 px-2 bg-lime-600 text-white rounded-3xl">{category}</span>
                </div>
            )}
        </article>
    )
}
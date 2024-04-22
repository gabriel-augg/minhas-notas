export default function Input({title, type = "text", placeholder}){
    return(
        <div className="flex flex-col">
            <label className="text-md text-black font-bold">{title}</label>
            <input type={type} className="input input-bordered bg-gray-100 text-gray-900" placeholder={placeholder} />
        </div>
    )
}
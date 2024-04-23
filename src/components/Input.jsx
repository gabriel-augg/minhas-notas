export default function Input({title, name, type = "text", placeholder, register, error}){


    return(
        <div className="flex flex-col">
            <label htmlFor={name} className="text-md text-black font-bold">
                {title}
            </label>
            <input
                id={name}
                type={type}
                className="input input-bordered bg-gray-100 text-gray-900"
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <span className="text-red-400 text-sm">{error.message}</span> }
            
        </div>
    )
}
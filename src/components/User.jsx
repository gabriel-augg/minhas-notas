import user_icon from "../assets/user.svg"

export default function User({username}){
    return(
        <div className="flex items-center gap-2">
            <img src={user_icon} width={40} alt="user icon" />
            <div className="flex flex-col">
                <span className="font-bold text-white text-md">{username}</span>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="bg-lime-500 flex justify-center text-sm text-white rounded-xl font-bold"><span>Conta</span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-44">
                        <li><a>Editar</a></li>
                        <li><a>Excluir conta</a></li>
                        <li><a>Sair</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
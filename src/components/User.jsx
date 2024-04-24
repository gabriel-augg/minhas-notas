import user_icon from "../assets/user.svg"
import { MdOutlineExitToApp } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";


export default function User({ username }) {
    return (
        <div className="flex items-center gap-2">
            <img src={user_icon} width={40} alt="user icon" />
            <div className="flex flex-col">
                <span className="font-bold text-white text-md">{username}</span>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="bg-lime-500 flex justify-center text-sm text-white rounded-xl font-bold"><span>Conta</span></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-44">
                        <li>
                            <div className="flex items-center justify-start p-1">
                                <button>
                                    <FaUserCog size={20} />
                                </button>
                                <button className="font-bold rounded-lg text-md">Editar conta</button>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-start p-1">
                                <button>
                                    <FaUserTimes size={20} />
                                </button>
                                <button className="font-bold rounded-lg text-md">Excluir conta</button>

                            </div>
                        </li>
                        <li>
                            <div className="flex items-center justify-start p-1">
                                <button>
                                    <MdOutlineExitToApp size={20} />
                                </button>
                                <button className="font-bold rounded-lg text-md">Sair</button>

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
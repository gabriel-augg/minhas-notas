import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import user_icon from "../assets/user.svg"
import { MdOutlineExitToApp } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";


export default function User({ username }) {

    const { signOut } = useContext(UserContext)

    function closeDropdown(){
        var dropdown = document.getElementById("user_dropdown")
        console.log(dropdown)
        dropdown.classList.remove("dropdown-open")
    }

    function logout(){
        alert("EITA!")
        closeDropdown()
    }

    return (
        <div className="flex items-center gap-2">
            <img src={user_icon} width={40} alt="user icon" />
            <div className="flex flex-col">
                <span className="font-bold text-white text-md">{username}</span>
                <div className="dropdown dropdown-hover" id="user_dropdown">
                    <div tabIndex={0} role="button" className="bg-lime-500 flex justify-center text-sm text-white rounded-xl font-bold px-1">Conta</div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-40">
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
                        <li onClick={() => logout()}>
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
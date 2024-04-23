import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import user_icon from "../assets/user.svg"
import logo from "../assets/logo.svg"


const Header = () => {
    const { user, authenticated } = useContext(UserContext)


    return(
        <header className="bg-green-950">
            <nav className={`p-4 flex ${authenticated ? "justify-between" : "justify-center"} items-center w-5/6 mx-auto`}>
                <Link to="/">
                    <img src={logo} width={100} alt="logo" />
                </Link>
                {authenticated && (
                    <div className="flex items-center gap-2">
                        <img src={user_icon} width={40} alt="user icon" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-md">{user.username}</span>
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
                )}

            </nav>
        </header>
    )
}

export default Header;
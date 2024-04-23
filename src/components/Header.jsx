import { useState } from "react";

import { Link } from "react-router-dom";
import user from "../assets/user.svg"
import logo from "../assets/logo.svg"


const Header = () => {
    const [authenticated, setAuthenticated] = useState(false)


    return(
        <header className="bg-green-950">
            <nav className={`p-4 flex ${authenticated ? "justify-between" : "justify-center"} items-center w-5/6 mx-auto`}>
                <Link to="/">
                    <img src={logo} width={120} alt="logo" />
                </Link>
                {authenticated && (
                    <div className="flex items-center gap-2">
                        <img src={user} width={50} alt="user icon" />
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-xl">Gabriel</span>
                            <div className="dropdown dropdown-hover">
                                <div tabIndex={0} role="button" className="bg-lime-500 flex justify-center text-white rounded-xl font-bold"><span>Conta</span></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-lime-900 text-white rounded-box w-48">
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
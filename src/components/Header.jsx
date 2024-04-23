
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"

import User from "./User";



const Header = () => {
    const { user, authenticated } = useContext(UserContext)


    return(
        <header className="bg-green-950">
            <nav className={`p-4 flex ${authenticated ? "justify-between" : "justify-center"} items-center w-5/6 mx-auto`}>
                <Link to="/">
                    <img src={logo} width={100} alt="logo" />
                </Link>
                {authenticated && (
                    <User username={user.username} />
                )}

            </nav>
        </header>
    )
}

export default Header;
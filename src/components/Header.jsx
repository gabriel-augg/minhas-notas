
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import User from "./User";
import Logo from "./Logo";


const Header = () => {
    const { user, authenticated } = useContext(UserContext)


    return(
        <header className="bg-green-950 fixed w-full top-0 left-0 z-20">
            <nav className={`py-4 flex ${authenticated ? "justify-between" : "justify-center"} items-center w-3/4 mx-auto`}>
                <Logo />
                {authenticated && (
                    <User username={user.username} />
                )}

            </nav>
        </header>
    )
}

export default Header;
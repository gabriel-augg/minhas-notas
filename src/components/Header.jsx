
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import User from "./User";
import Logo from "./Logo";


const Header = () => {
    const { user, authenticated } = useContext(UserContext)


    return(
        <header className="bg-green-950">
            <nav className={`p-4 flex ${authenticated ? "justify-between" : "justify-center"} items-center w-5/6 mx-auto`}>
                <Logo />
                {authenticated && (
                    <User username={user.username} />
                )}

            </nav>
        </header>
    )
}

export default Header;
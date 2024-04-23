import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const UserContext = createContext()

export function UserProvider({children}){
    const { user, authenticated, signUp } = useAuth()

    return(
        <UserContext.Provider value={{ user, authenticated, signUp }}>
            {children}
        </UserContext.Provider>
    )
}
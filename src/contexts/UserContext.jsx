import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const UserContext = createContext()

export function UserProvider({children}){
    const { authenticated, signUp } = useAuth()

    return(
        <UserContext.Provider value={{ authenticated, signUp }}>
            {children}
        </UserContext.Provider>
    )
}
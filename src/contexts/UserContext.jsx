import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const {
        user,
        setUser,
        authenticated,
        loadingAuth,
        loading,
        signUp,
        signIn,
        signOut,
        updateUser,
        deleteUser,
    } = useAuth();

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                authenticated,
                loading,
                loadingAuth,
                signUp,
                signIn,
                signOut,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

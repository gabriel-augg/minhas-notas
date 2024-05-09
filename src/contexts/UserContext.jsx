import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { user, setUser, authenticated, loadingAuth, signUp, signIn, signOut } = useAuth();

  return (
    <UserContext.Provider value={{ user, setUser, authenticated, loadingAuth, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

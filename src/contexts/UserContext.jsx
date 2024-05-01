import { createContext } from "react";

import useAuth from "../hooks/useAuth";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const { user, authenticated, signUp, signIn, signOut } = useAuth();

  return (
    <UserContext.Provider value={{ user, authenticated, signUp, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

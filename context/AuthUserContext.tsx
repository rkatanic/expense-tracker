import React, { createContext, useContext } from "react";
import { UserCredential } from "firebase/auth";
import useFirebaseAuth from "../lib/useFirebaseAuth";

const authUserContext = createContext({
  authUser: null,
  signIn: (_email: string, _password: string): Promise<UserCredential> =>
    ({} as any),
  logout: () => {},
});

export const AuthUserProvider = ({ children }: any): JSX.Element => {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
};

export const useAuth = () => useContext(authUserContext);

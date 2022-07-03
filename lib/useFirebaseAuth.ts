import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { app } from "./firebaseClient";
import nookies from "nookies";

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  const clear = () => {
    setAuthUser(null);
  };

  const signIn = (email: string, password: string): Promise<UserCredential> =>
    signInWithEmailAndPassword(getAuth(app), email, password);

  const logout = (): Promise<void> => signOut(getAuth(app)).then(clear);

  // listen for token changes
  // call setAuthUser and write new token as a cookie
  useEffect(() => {
    return getAuth(app).onIdTokenChanged(async (user) => {
      if (!user) {
        setAuthUser(null);
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setAuthUser(user as any);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth(app).currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    authUser,
    signIn,
    logout,
  };
};

export default useFirebaseAuth;

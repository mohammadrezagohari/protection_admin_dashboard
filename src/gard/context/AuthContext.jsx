import { createContext, useState } from "react";
import { useLocalStorage } from "../storage/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useLocalStorage("_token_admin", null);

  const loginContext = (token) => {
    setUserToken(token);
    // localStorage.setItem("_token_testato", token);
    // Perform login logic
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("_token_admin");
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loginContext,
        setUserToken,
        userToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

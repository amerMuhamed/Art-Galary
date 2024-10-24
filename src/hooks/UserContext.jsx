import react, { useState, useEffect } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [authenticationData, setAuthenticationData] = useState(token || "");

  const saveAuthenticationData = (token, user) => {
    localStorage.setItem("token", JSON.stringify(token));
    setAuthenticationData(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticationData("");
  };

  return (
    <AuthContext.Provider
      value={{ authenticationData, saveAuthenticationData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

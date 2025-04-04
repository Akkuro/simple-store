"use client";
import { loginUser } from "@/utils/api";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthContextProps = {
  accessToken: string;
  login: (username: string, password: string) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string>("");

  const login = async (username: string, password: string) => {
    try {
      const data = await loginUser(username, password);
      const { token } = data;
      if (token) {
        setAccessToken(token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context should be used within AuthContextProvider");
  }
  return context;
};

"use client";
import { loginUser } from "@/utils/api";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProps = {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const data = await loginUser(username, password);
      const { token } = data;
      if (token) {
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ accessToken, login, logout, isAuthenticated }}
    >
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

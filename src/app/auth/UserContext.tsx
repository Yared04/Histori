import { createContext, SetStateAction, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

interface UserContextType {
  curUser: any;
  setCurUser: React.Dispatch<React.SetStateAction<any>>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<SetStateAction<boolean>>;
}
export const userContext = createContext<Partial<UserContextType>>({
  curUser: null,
  setCurUser: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

interface MyJwtPayload {
  _id: string;
  email: string; // Add username here
  iat: number;
  exp: number;
  role: string;
}


export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [curUser, setCurUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      // Check if token is expired
      const isExpired = (decoded.exp as number) * 1000 < Date.now();
      if (!isExpired) {
        setCurUser({email: decoded.email, role: decoded.role} as any); // Add 'as any' to bypass type checking
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      // Check if token is expired
      const isExpired = (decoded.exp as number) * 1000 < Date.now();
      if (!isExpired) {
        setCurUser({email: decoded.email, role: decoded.role} as any); // Add 'as any' to bypass type checking
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<MyJwtPayload>(token);
      // Check if token is expired
      const isExpired = (decoded.exp as number) * 1000 < Date.now();
      if (!isExpired) {
        setCurUser({email: decoded.email, role: decoded.role} as any); // Add 'as any' to bypass type checking
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <userContext.Provider value={{ curUser, setCurUser, showLogin, setShowLogin}}>
      {children}
    </userContext.Provider>
  );
};


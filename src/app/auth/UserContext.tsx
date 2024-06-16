import { createContext, SetStateAction, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
  email: string;
  iat: number;
  exp: number;
  role: string;
  points: number;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [curUser, setCurUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCurUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <userContext.Provider
      value={{ curUser, setCurUser, showLogin, setShowLogin }}
    >
      {children}
    </userContext.Provider>
  );
};

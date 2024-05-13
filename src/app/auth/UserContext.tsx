import { createContext, useState } from "react";

interface UserContextType {
  curUser: any;
  setCurUser: React.Dispatch<React.SetStateAction<any>>;
}
export const userContext = createContext<Partial<UserContextType>>({
  curUser: null,
  setCurUser: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [curUser, setCurUser] = useState(null);

  return (
    <userContext.Provider value={{ curUser, setCurUser }}>
      {children}
    </userContext.Provider>
  );
};


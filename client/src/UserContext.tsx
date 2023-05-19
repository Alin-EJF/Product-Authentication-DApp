import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface UserContextData {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  ready: boolean;
}

export const UserContext = createContext<UserContextData>(
  {} as UserContextData
);

interface UserContextProviderProps {
  children: ReactNode;
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    if (!user) {
      axios.get("/auth/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

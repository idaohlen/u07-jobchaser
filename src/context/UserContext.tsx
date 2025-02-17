import { createContext, useContext, ReactNode, useState } from 'react';

interface User {
  email: string;
  password: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider ({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user: user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
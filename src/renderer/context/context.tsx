'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of context
interface AppContextType {
  Token: string;
  SetToken: (token: string) => void;
  loading: boolean;
  setloading: (loading: boolean) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType>({
  Token: '',
  SetToken: () => {},
  loading: false,
  setloading: () => {},
});

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [Token, SetToken] = useState('');
  const [loading, setloading] = useState(false);

  React.useEffect(() => {
    const gettoken = async () => {
      const token = await window.electronAPI.gettoken();
      console.log(token);
      SetToken(token);
    };
    gettoken();
  }, []);

  return (
    <AppContext.Provider value={{ Token, SetToken, loading, setloading }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => useContext(AppContext);

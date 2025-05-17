'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  Token: string;
  SetToken: (token: string) => void;
  loading: boolean;
  setloading: (loading: boolean) => void;
  CurrentSong: string,
  SetCurrentSong: (url: string) => void
}

const AppContext = createContext<AppContextType>({
  Token: '',
  SetToken: () => {},
  loading: false,
  setloading: () => {},
  CurrentSong: '',
  SetCurrentSong: () => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [Token, SetToken] = useState('');
  const [loading, setloading] = useState(false);
  const [CurrentSong, SetCurrentSong] = useState(null)

  React.useEffect(() => {
    const gettoken = async () => {
      const token = await window.electronAPI.gettoken();
      console.log(token);
      SetToken(token);
    };
    gettoken();
  }, []);

  return (
    <AppContext.Provider value={{ Token, SetToken, loading, setloading, CurrentSong, SetCurrentSong }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => useContext(AppContext);

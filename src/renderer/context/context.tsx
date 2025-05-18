'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppContextType {
  Token: string;
  SetToken: (token: string) => void;
  loading: boolean;
  setloading: (loading: boolean) => void;
  CurrentSong: string | null;
  SetCurrentSong: (url: string | null) => void;
}
const AppContext = createContext<AppContextType>({
  Token: '',
  SetToken: () => { },
  loading: false,
  setloading: () => { },
  CurrentSong: '',
  SetCurrentSong: () => { }
});

export const AppProvider = ({ children }: { children: ReactNode }) => {

  const [Token, SetToken] = useState('');
  const [loading, setloading] = useState(false);
  const [CurrentSong, SetCurrentSong] = useState<string | null>(null);

  const navigate = useNavigate()

  React.useEffect(() => {
    const gettoken = async () => {
      const token = await window.electronAPI.gettoken();
      console.log(token);
      SetToken(token);
    };
    gettoken();
  }, []);

   React.useEffect(() => {
    window.electronAPI.onToken((newToken) => {
      SetToken(newToken);
    });

    window.electronAPI.gettoken().then((storedToken) => {
      if (storedToken) SetToken(storedToken);
    });
  }, []);




  return (
    <AppContext.Provider value={{ Token, SetToken, loading, setloading, CurrentSong, SetCurrentSong }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

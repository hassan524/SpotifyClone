'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  Token: string;
  SetToken: (token: string) => void;
  loading: boolean;
  setloading: (loading: boolean) => void;
  CurrentSong: string | null;
  SetCurrentSong: (url: string | null) => void;
  ProfileInfo: any;
  SetProfileInfo: (info: any) => void;
}

const AppContext = createContext<AppContextType>({
  Token: '',
  SetToken: () => {},
  loading: false,
  setloading: () => {},
  CurrentSong: '',
  SetCurrentSong: () => {},
  ProfileInfo: '',
  SetProfileInfo: () => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [Token, SetToken] = useState('');
  const [ProfileInfo, SetProfileInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const [CurrentSong, SetCurrentSong] = useState<string | null>(null);

  React.useEffect(() => {
    const init = async () => {
      try {
        const token = await window.electronAPI.gettoken();
        console.log('Stored token:', token);
        if (token) SetToken(token);

        const info = await window.electronAPI.me();
        SetProfileInfo(info)
      } catch (err) {
        console.error('Error initializing token/user info:', err);
      }
    };

    init();

    window.electronAPI.onToken((newToken) => {
      console.log('New token received:', newToken);
      SetToken(newToken);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        Token,
        SetToken,
        loading,
        setloading,
        CurrentSong,
        SetCurrentSong,
        ProfileInfo,
        SetProfileInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

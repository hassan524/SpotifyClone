'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';

const AppContext = createContext({
  Token: '',
  SetToken: (token: string) => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [Token, SetToken] = useState('');

  React.useEffect(() => {
    const gettoken = async () => {
      const token = await window.electronAPI.gettoken()
      console.log(token)
      SetToken(token)
    }
    gettoken()
  }, [])

  return (
    <AppContext.Provider value={{ Token, SetToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

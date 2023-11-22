import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

type languages = 'srb' | 'eng' | 'ru';

interface IContextProps {
  mainLang: languages;
  setMainLang: Dispatch<SetStateAction<languages>> | ((language: languages) => void);
}

const initialValue = {
  mainLang: 'srb',
  setMainLang: (language: languages) => undefined,
};

const Context = createContext(initialValue);

export const useMainContext = () => useContext(Context);

export const MainContextProvider = ({ children }) => {
  const [mainLang, setMainLang] = useState<languages>('srb');

  return <Context.Provider value={{ mainLang, setMainLang }}>{children}</Context.Provider>;
};

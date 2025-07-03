'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLanguages } from '@/utils/api'; // ✅ Import from api.ts

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('hindi');
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) setLanguage(savedLang);

    getLanguages()
      .then((langs) => {
        console.log("✅ Fetched languages:", langs);
        setAvailableLanguages(langs || []);
      })
      .catch((err) => {
        console.error("❌ Error loading languages:", err);
        setAvailableLanguages([]); // fallback to empty list
      });
  }, []);

  const updateLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

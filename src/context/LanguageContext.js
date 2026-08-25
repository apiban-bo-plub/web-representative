"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

const LanguageContext = createContext();

const locales = { en, th };

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('apb-lang');
    if (saved && (saved === 'en' || saved === 'th')) {
      setLanguageState(saved);
    }
  }, []);

  // Keep the document language in sync so screen readers, Thai line-breaking
  // and crawlers see the language the user actually selected. layout.js is a
  // Server Component, so this has to be set imperatively from the client.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'th') {
      setLanguageState(lang);
      localStorage.setItem('apb-lang', lang);
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let val = locales[language];
    for (const k of keys) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        // Fallback to English dictionary if key is missing in Thai
        let fallbackVal = locales['en'];
        for (const fk of keys) {
          if (fallbackVal && fallbackVal[fk] !== undefined) {
            fallbackVal = fallbackVal[fk];
          } else {
            return path;
          }
        }
        return fallbackVal;
      }
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, locales, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/i18n/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

const detectLanguage = (): Language => {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("hi")) return "hi";
  if (browserLang.startsWith("te")) return "te";
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(detectLanguage());
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

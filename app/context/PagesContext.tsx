"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { Page } from "@/types";

// Tipo atualizado
type PageContextType = {
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
};

// Contexto
const PagesContext = createContext<PageContextType | undefined>(undefined);

// Provider
export function PagesProvider({ children }: { children: ReactNode }) {
  const [pages, setPages] = useState<Page[]>([]);

  return (
    <PagesContext.Provider value={{ pages, setPages }}>
      {children}
    </PagesContext.Provider>
  );
}

// Hook de acesso ao contexto
export function usePage() {
  const context = useContext(PagesContext);
  if (!context) {
    throw new Error("usePage deve ser usado dentro de <PageProvider>");
  }
  return context;
}

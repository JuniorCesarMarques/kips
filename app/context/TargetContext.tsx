"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { Comp, Level, Page } from "@/types";


type TargetContextType = {
  targetPage: Page | null;
  targetComp: Comp | null;
  targetLevel: Level | null;
  setTargetComp: React.Dispatch<React.SetStateAction<Comp | null>>;
  setTargetLevel: React.Dispatch<React.SetStateAction<Level | null>>;
  setTargetPage: React.Dispatch<React.SetStateAction<Page | null>>;
};

const TargetContext = createContext<TargetContextType | null>(null);

export function TargetProvider({ children }: { children: ReactNode }) {

  // Estado de edição pode começar como null
  const [targetComp, setTargetComp] = useState<Comp | null>(null);
  const [targetLevel, setTargetLevel] = useState<Level | null>(null);
  const [targetPage, setTargetPage] = useState<Page | null>(null);


  return (
    <TargetContext.Provider value={{targetPage, setTargetPage, targetComp, setTargetComp, targetLevel,  setTargetLevel }}>
      {children}
    </TargetContext.Provider>
  );
}

// Hook para consumir o contexto com verificação de uso correto
export function useTarget() {
  const context = useContext(TargetContext);
  if (!context) {
    throw new Error("useTarget deve ser usado dentro de <TargetProvider>");
  }
  return context;
}

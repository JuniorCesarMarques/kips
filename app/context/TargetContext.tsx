"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { Comp } from "@/types";


type TargetContextType = {
  editing: Comp | null;
  setEditing: React.Dispatch<React.SetStateAction<Comp | null>>;
};

const TargetContext = createContext<TargetContextType | null>(null);

export function TargetProvider({ children }: { children: ReactNode }) {
  // Estado de edição pode começar como null
  const [editing, setEditing] = useState<Comp | null>(null);

  return (
    <TargetContext.Provider value={{ editing, setEditing }}>
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

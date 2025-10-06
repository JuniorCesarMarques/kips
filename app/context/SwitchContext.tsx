'use client';

import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type SwitchContextType = {
    checked: boolean;
    setChecked: Dispatch<SetStateAction<boolean>>;
};


const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

// Provider
export function SwitchProvider({ children }: { children: ReactNode }) {

    const [checked, setChecked] = useState(true)


    return (
        <SwitchContext.Provider value={{ checked, setChecked }}>
            {children}
        </SwitchContext.Provider>
    );
}


// Hook para usar o contexto
export function useSwitch() {
    const context = useContext(SwitchContext);
    if (!context) {
        throw new Error('useSwitch deve ser usado dentro de <SwitchProvider>');
    }
    return context;
}

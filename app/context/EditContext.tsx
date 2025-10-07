'use client';

import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';

type SwitchContextType = {
    edit: boolean;
    setEdit: Dispatch<SetStateAction<boolean>>;
};


const EditContext = createContext<SwitchContextType | undefined>(undefined);

// Provider
export function EditProvider({ children }: { children: ReactNode }) {

    const [edit, setEdit] = useState(false);


    return (
        <EditContext.Provider value={{ edit, setEdit }}>
            {children}
        </EditContext.Provider>
    );
}


// Hook para usar o contexto
export function useEdit() {
    const context = useContext(EditContext);
    if (!context) {
        throw new Error('useSwitch deve ser usado dentro de <SwitchProvider>');
    }
    return context;
}

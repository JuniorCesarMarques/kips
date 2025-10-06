"use client"

import { createContext, ReactNode, useState, useContext } from "react"

type CurrentIndexType = {
    currentIndex: number,
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
}

const IndexContext = createContext<CurrentIndexType | undefined>(undefined)

export function IndexProvider({children}: {children: ReactNode}) {

    const [currentIndex, setCurrentIndex] = useState<number>(0)

    return (
        <IndexContext.Provider value={{currentIndex, setCurrentIndex}}>
            {children}
        </IndexContext.Provider>
    )
}

export function useIndex() {
    const context = useContext(IndexContext);
        if (!context) {
        throw new Error('useSwitch deve ser usado dentro de <SwitchProvider>');
    }   
    return context;
}
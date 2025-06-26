import { PosSession } from "@/types";
import {createContext, useContext, useState, ReactNode} from 'react';

interface PosSessionContextType {
    posSession: PosSession | null;
    setPosSession: (session: PosSession) => void;
    clearPosSession: () => void;
}

const PosSessionContext = createContext<PosSessionContextType | undefined>(undefined);

export const PosSessionProvider = ({ children}: {children: ReactNode}) => {
    const [posSession, setPosSession] = useState<PosSession | null>(null);

    const clearPosSession = () => setPosSession(null);

    return (
        <PosSessionContext.Provider value={{posSession, setPosSession, clearPosSession}}>
            {children}
        </PosSessionContext.Provider>
    );
};

export const usePosSession = () => {
    const context = useContext(PosSessionContext);
    if (!context) {
        throw new Error('useSession mustbe used within a SessionProvider');
    }
    return context;
}

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ModalContextType {
    modals: Record<string, boolean>;
    openModal: (id: string) => void;
    closeModal: (id: string) => void;
    toggleModal: (id: string) => void;
}

// Создаем контекст с типом
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<Record<string, boolean>>({});

    const openModal = useCallback((id: string) => {
        setModals(prev => ({ ...prev, [id]: true }));
    }, []);

    const closeModal = useCallback((id: string) => {
        setModals(prev => ({ ...prev, [id]: false }));
    }, []);

    const toggleModal = useCallback((id: string) => {
        setModals(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    const value = { modals, openModal, closeModal, toggleModal };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within ModalProvider');
    }
    return context;
};
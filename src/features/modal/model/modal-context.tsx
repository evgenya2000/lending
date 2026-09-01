'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface ModalState {
  isOpen: boolean;
  data?: any;
}

export interface ModalContextType {
  modals: Record<string, ModalState>;
  openModal: (id: string, data?: any) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<Record<string, ModalState>>({});

  const openModal = useCallback((id: string, data?: any) => {
    setModals(prev => ({ ...prev, [id]: { isOpen: true, data } }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => ({ ...prev, [id]: { isOpen: false, data: undefined } }));
  }, []);

  const toggleModal = useCallback((id: string) => {
    setModals(prev => ({
      ...prev,
      [id]: {
        isOpen: !prev[id]?.isOpen,
        data: prev[id]?.data,
      },
    }));
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
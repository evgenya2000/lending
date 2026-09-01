'use client';

import { useCallback } from 'react';
import { useModalContext } from '../model/modal-context';

export const useModal = (modalId: string) => {
  const { modals, openModal, closeModal, toggleModal } = useModalContext();

  const open = useCallback((data?: any) => {
    openModal(modalId, data);
  }, [modalId, openModal]);

  const close = useCallback(() => {
    closeModal(modalId);
  }, [modalId, closeModal]);

  const toggle = useCallback(() => {
    toggleModal(modalId);
  }, [modalId, toggleModal]);

  const modalState = modals[modalId] ?? { isOpen: false, data: undefined };
  const isOpen = modalState.isOpen;
  const data = modalState.data;

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
  };
};
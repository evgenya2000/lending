'use client';

import { useCallback } from 'react';
import { useModalContext } from '../model/modal-context';

export const useModal = (modalId: string) => {
    const { modals, openModal, closeModal, toggleModal } = useModalContext();

    const open = useCallback(() => {
        openModal(modalId);
    }, [modalId, openModal]);

    const close = useCallback(() => {
        closeModal(modalId);
    }, [modalId, closeModal]);

    const toggle = useCallback(() => {
        toggleModal(modalId);
    }, [modalId, toggleModal]);

    const isOpen = modals[modalId] ?? false;

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};
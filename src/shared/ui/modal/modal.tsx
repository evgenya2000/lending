// src/shared/ui/modal/modal.tsx
'use client';

import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { useModal } from './use-modal-state';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
  ariaLabel?: string;
  ariaDescription?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  showCloseButton = false,
  closeButtonClassName = '',
  ariaLabel = 'Modal',
  ariaDescription,
}: ModalProps) => {
  const { modalRef, handleOverlayClick } = useModal({
    isOpen,
    onClose,
    closeOnOverlayClick,
    closeOnEscape,
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${overlayClassName}`}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        className={`${styles.modal} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescription}
        tabIndex={-1}
        data-testid="modal"
      >
        {showCloseButton && (
          <button
            className={`${styles.closeButton} ${closeButtonClassName}`}
            onClick={onClose}
            aria-label="Close modal"
            data-testid="modal-close-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className={`${styles.content} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
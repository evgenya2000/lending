import styled, { keyframes } from "styled-components";

const overlayFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${overlayFadeIn} 0.3s ease;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

export const StyledModal = styled.div`
  background-color: var(--background);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: ${modalSlideIn} 0.3s ease;
  outline: none;
  margin-bottom: 300px;

  @media (max-width: 768px) {
    width: 95vw;
    margin: 10px;
    max-height: 85vh;
  }

  @media (max-width: 480px) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    margin: 0;
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--background-black);
    color: var(--background);
  }
`;

export const StyledModalContent = styled.div`
  padding: 24px;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    height: 100%;
  }
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted-2);
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    background-color: var(--color-bg-hover);
    color: var(--color-text);
  }

  &:focus {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }

  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
  }

  @media (prefers-color-scheme: dark) {
    color: var(--color-text-muted);

    &:hover {
      background-color: var(--color-text);
      color: var(--background);
    }
  }
`;

'use client';

import { ModalProvider } from '@/features/modal/model/modal-context';
import StoreProvider from './store-provider';
import { Header } from '@/widgets/header/ui/header';
import { Footer } from '@/widgets/footer/ui/footer';
import { Modal } from '@/shared/ui/modal/modal';
import { useModal } from '@/features/modal/lib/use-modal';

function ModalHost() {
  const orderModal = useModal('order');
  const confirmModal = useModal('confirm');
  const infoModal = useModal('info');

  return (
    <>
      <Modal
            isOpen={orderModal.isOpen}
            onClose={orderModal.close}
            showCloseButton
            ariaLabel="Оформление заказа"
          >
            <h2>Оформление заказа</h2>
            <p>Здесь будет форма заказа</p>
            <button onClick={orderModal.close}>Закрыть</button>
          </Modal>

          <Modal
            isOpen={confirmModal.isOpen}
            onClose={confirmModal.close}
            showCloseButton
            ariaLabel="Подтверждение"
          >
            <h2>Подтверждение</h2>
            <p>Вы уверены в своем действии?</p>
            <button onClick={confirmModal.close}>Закрыть</button>
          </Modal>

          <Modal
            isOpen={infoModal.isOpen}
            onClose={infoModal.close}
            showCloseButton
            ariaLabel="Информация"
          >
            <h2>Информация</h2>
            <p>Полезная информация для пользователя</p>
            <button onClick={infoModal.close}>Закрыть</button>
          </Modal>
    </>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <StoreProvider>
        <Header />
        {children}
        <Footer />
        <ModalHost />
      </StoreProvider>
    </ModalProvider>
  );
}
'use client';

import { ModalProvider } from '@/features/modal/model/modal-context';
import StoreProvider from './store-provider';
import { Header } from '@/widgets/header/ui/header';
import { Footer } from '@/widgets/footer/ui/footer';
import { Modal } from '@/shared/ui/modal/modal';
import { useModal } from '@/features/modal/lib/use-modal';
import { OrderForm } from '@/features/order-form/ui/order-form';
import { OrderDetails } from '@/features/order-details/ui/order-details';
import { useGLTF } from '@react-three/drei';

function ModalHost() {
  const orderModal = useModal('order');
  const orderDetailsModal = useModal('order-details');

  return (
    <>
      <Modal
        isOpen={orderModal.isOpen}
        onClose={orderModal.close}
        showCloseButton
        ariaLabel="Оформление заказа"
      >
        <OrderForm onCancel={orderModal.close} />
      </Modal>

      <Modal
        isOpen={orderDetailsModal.isOpen}
        onClose={orderDetailsModal.close}
        showCloseButton
        ariaLabel="Детали заказа"
      >
        {orderDetailsModal.data && <OrderDetails order={orderDetailsModal.data} />}
      </Modal>
    </>
  );
}

if (typeof window !== 'undefined') {
  useGLTF.preload('./macaron_conf1.glb');
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
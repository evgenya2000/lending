'use client';

import { ModalProvider } from '@/features/modal/model/modal-context';
import StoreProvider from './store-provider';
import { Header } from '@/widgets/header/ui/header';
import { Footer } from '@/widgets/footer/ui/footer';
import { Modal } from '@/shared/ui/modal/modal';
import { useModal } from '@/features/modal/lib/use-modal';
import { OrderForm } from '@/features/order-form/ui/order-form';
import { OrderDetails } from '@/features/order-details/ui/order-details';
import { AssembleOrder } from '@/features/assemble-order/ui/assemble-order';
import { Answer } from '@/features/answer/ui/answer';
import { StyledComponentsRegistry } from './styled-registry';
import { GlobalStyle } from './global-styles';

function ModalHost() {
  const orderModal = useModal('order');
  const orderDetailsModal = useModal('order-details');
  const assembleOrderModal = useModal('assemble-order');
  const successModal = useModal('success');
  const errorModal = useModal('error');

  return (
    <>
      <Modal
        isOpen={orderModal.isOpen}
        onClose={orderModal.close}
        showCloseButton
        ariaLabel="orderModal"
      >
        <OrderForm onSuccess={() => {orderModal.close(); successModal.open("Заказ отправлен");}} onCancel={orderModal.close} onError={errorModal.open}/>
      </Modal>

      <Modal
        isOpen={orderDetailsModal.isOpen}
        onClose={orderDetailsModal.close}
        showCloseButton
        ariaLabel={"orderDetailsModal"}
      >
        {orderDetailsModal.data && <OrderDetails order={orderDetailsModal.data} />}
      </Modal>

      <Modal
        isOpen={assembleOrderModal.isOpen}
        onClose={assembleOrderModal.close}
        showCloseButton
        ariaLabel={"assembleOrderModal"}
      >
        {assembleOrderModal.data && (
          <AssembleOrder
            order={assembleOrderModal.data}
            onSuccess={() => {
              assembleOrderModal.close();
              successModal.open('Заказ собран');
            }}
            onCancel={assembleOrderModal.close}
            onError={errorModal.open}
          />
        )}
      </Modal>

      
      <Modal
        isOpen={successModal.isOpen}
        onClose={successModal.close}
        showCloseButton
        ariaLabel={"successModal"}
      >
        {successModal.data && <Answer text={successModal.data} />}
      </Modal>
      
      <Modal
        isOpen={errorModal.isOpen}
        onClose={errorModal.close}
        showCloseButton
        ariaLabel={"errorModal"}
      >
        {errorModal.data && <Answer text={errorModal.data} />}
      </Modal>
    </>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <ModalProvider>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <ModalHost />
        </StoreProvider>
      </ModalProvider>
    </StyledComponentsRegistry>
  );
}
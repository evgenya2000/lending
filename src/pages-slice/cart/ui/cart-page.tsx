'use client';

import { Cart } from "@/widgets/cart/ui/cart";
import { ContainerMain } from "@/widgets/main/ui/conteiner-main";

export default function CartPage() {
  return (
    <ContainerMain
      allWidth={<Cart/>}
    />
  );
}
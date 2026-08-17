'use client';

import { ContainerCart } from "@/widgets/container-cart/ui/conteiner-cart";
import { ContainerMain } from "@/widgets/main/ui/conteiner-main";

export default function CartPage() {
  return (
    <ContainerMain
      allWidth={<ContainerCart/>}
    />
  );
}
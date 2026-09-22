"use client"
import { useCart } from "@/features/cart/useCart";
import Link from "next/link";
import { Icon } from "@/shared/icons/icon";
import { ShoppingBasket } from "@/shared/icons/shopping-basket";
import { StyledHeader, StyledBasket, StyledTotalQuantity } from "./header.styles";

export const Header = () => {
    const { totalQuantity } = useCart();
    return (
        <StyledHeader>
            <Link href="/" className="main"><Icon/></Link>
            <nav>
                <StyledBasket href="/cart" title={"Перейти в корзину"}>
                    <ShoppingBasket/>
                    <StyledTotalQuantity>{totalQuantity}</StyledTotalQuantity>
                </StyledBasket>
            </nav>
        </StyledHeader>
    );
}

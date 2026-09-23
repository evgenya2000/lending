import Link from 'next/link';
import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  width: 100%;
  height: var(--header-height);
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
  position: sticky;
  top: 0;
  z-index: 100;

  nav {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: 35px;
  }
`;

export const StyledBasket = styled(Link)`
  position: relative;
  display: flex;
  align-items: end;
  gap: 5px;

  svg {
    width: 35px;
    height: 35px;
  }
`;

export const StyledTotalQuantity = styled.span`
  font-weight: 530;
  font-size: 18px;
  position: absolute;
  top: -2px;
  left: 20px;
  border-radius: 64px;
  background-color: var(--color-accent);
  width: auto;
  text-align: center;
  height: 22px;
  padding: 1px 5px;
  color: var(--color-text-inverse);
`;

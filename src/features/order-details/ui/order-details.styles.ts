import styled, { css } from "styled-components";

const copyableStyles = css`
  cursor: pointer;
  transition: font-weight 0.2ms ease;

  &:hover {
    font-weight: 600 !important;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1300px;

  h3 {
    padding-bottom: 24px;
  }

  h4 {
    padding-bottom: 12px;
    font-weight: 500;
  }
`;

export const StyledInfo = styled.div`
  display: flex;
  gap: 40px;
  padding-bottom: 24px;
`;

export const StyledInfoRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:not(:last-child)::before {
    content: "";
    position: absolute;
    top: 0;
    right: -20px;
    width: 1px;
    height: 100%;
    background-color: var(--color-border-2);
  }
`;

export const StyledInfoLabel = styled.div`
  font-weight: 500;
`;

export const StyledInfoValue = styled.div`
  font-size: 14px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: none;

  th {
    border: 1px solid var(--color-border-2);
    padding: 8px;
    font-weight: 500;
    text-align: left;
  }

  td {
    border: 1px solid var(--color-border-2);
    border-top: none;
    padding: 8px;
    font-size: 14px;
  }

  td:last-child {
    text-align: center;
  }

  tr:first-child th,
  tr:first-child td {
    border-top: none;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr {
    background-color: var(--background);
    transition: background-color 0.2ms ease;

    &:hover {
      background-color: var(--color-surface);
    }
  }

  th:first-child,
  td:first-child {
    border-left: none;
    padding-left: 0;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 110px;
  }

  td:nth-child(2) {
    text-align: center;
  }

  th:last-child,
  td:last-child {
    border-right: none;
    width: 80px;
  }

  tfoot tr:last-child td {
    font-weight: 500;
    font-size: 16px;
  }

  tfoot tr:last-child td:first-child {
    text-align: right;
    font-weight: 500;
    font-size: 16px;
  }

  thead,
  tbody tr,
  tfoot {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody {
    display: block;
    max-height: 500px;
    overflow-y: auto;
    width: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledCopyable = styled.div`
  ${copyableStyles}
`;

export const StyledCopyableCell = styled.td`
  ${copyableStyles}
`;

export const StyledCopyMessage = styled.span<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  right: 35px;
  color: var(--color-text-muted);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  font-size: 18px;
`;

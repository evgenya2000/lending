import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 40px 30px 20px;
  position: relative;
`;

export const StyledTitle = styled.h3`
  margin-bottom: 10px;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border: none;

  th,
  td {
    border: 1px solid var(--color-border);
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: 500;
  }

  td {
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

  th:first-child,
  td:first-child {
    border-left: none;
  }

  th:last-child,
  td:last-child {
    border-right: none;
    width: 352px;
  }
`;

export const StyledEmpty = styled.div`
  padding: 0 10px 10px 10px;
  color: var(--color-text-muted-2);
`;

export const StyledCopyableTd = styled.td`
  cursor: pointer;
  transition: font-weight 0.2ms ease;

  &:hover {
    font-weight: 600 !important;
  }
`;

export const StyledCopyMessage = styled.span<{ $visible: boolean }>`
  position: absolute;
  top: 40px;
  right: 30px;
  color: var(--color-text-muted);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  font-size: 18px;
`;

export const StyledWrapperButton = styled.div `
  display: flex;
  gap: 10px;
`
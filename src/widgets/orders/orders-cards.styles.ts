import styled from "styled-components";

export const StyledCardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 16px;

  border: 1px solid var(--color-border);
  border-radius: 14px;
`;

export const StyledCardRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

export const StyledCardLabel = styled.span`
  flex-shrink: 0;

  font-weight: 500;
  color: var(--color-text-muted);
`;

export const StyledCardValue = styled.span`
  min-width: 0;

  font-size: 14px;
  text-align: right;
  word-break: break-word;
`;

export const StyledCardCopyable = styled(StyledCardValue)`
  cursor: pointer;
  transition: font-weight 0.2ms ease;

  &:hover {
    font-weight: 600;
  }
`;

export const StyledCardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin-top: 6px;
`;

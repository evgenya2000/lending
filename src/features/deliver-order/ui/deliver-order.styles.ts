import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 1300px;
`;

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledLabel = styled.label`
  font-weight: 500;
`;

export const StyledError = styled.span`
  color: var(--color-error, #d32f2f);
  font-size: 14px;
`;

export const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

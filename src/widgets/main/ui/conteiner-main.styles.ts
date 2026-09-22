import styled from 'styled-components';

export const StyledWrapperLending = styled.main`
  display: flex;
  width: 100%;
  flex-grow: 1;
`;

export const StyledWrapperCenter = styled.main`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

export const StyledLeft = styled.div`
  width: 400px;
  height: 100%;
`;

export const StyledRight = styled.div`
  width: calc(100% - 400px);
  height: 100%;
`;

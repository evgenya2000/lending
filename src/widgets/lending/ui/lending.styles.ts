import styled from 'styled-components';

export const StyledGrid = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(8, 1fr);
  gap: 50px 20px;
  padding: 0 10px 10px 10px;
`;

export const StyledCardWrapper = styled.div`
  width: 170px;
  min-height: 305px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCardWrapperText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1px;
  width: 170px;
  flex-grow: 1;

  h3 {
    font-size: 18px;
  }
`;

export const StyledCardDescription = styled.p`
  font-size: 12px;
  color: #6b6b6b;
  margin-bottom: auto;
`;

export const StyledCardPrice = styled.p`
  font-size: 14px;
  font-weight: 400;
  background-color: #ff7171;
  color: #fff;
  border-radius: 64px;
  width: max-content;
  height: 28px;
  padding: 6px 10px;
  margin-bottom: 6px;
`;

export const StyledCardQuantity = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const StyledWrapper3d = styled.div`
  width: 150px;
  height: 150px;
  max-height: 150px;
  position: relative;
  flex-grow: 1;
`;

export const StyledText = styled.h3`
  padding: 40px 10px 10px 10px;
`;

import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 40px 30px 20px 30px;
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0px 100px;
  }

  li {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
  }
`;

export const StyledWrapper3d = styled.div`
  width: 150px;
  height: 130px;
  position: relative;
  flex-shrink: 0;
`;

export const StyledWrapperText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    font-size: 18px;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #6b6b6b;
  }

  p:last-child {
    font-size: 14px;
    font-weight: 400;
    background-color: #ff7171;
    color: #fff;
    border-radius: 64px;
    padding: 6px 10px;
    display: inline-block;
    width: max-content;
    margin-top: 4px;
  }
`;

export const StyledWrapperButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
    min-width: 24px;
    text-align: center;
  }
`;

export const StyledPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-left: 10px;
`;

export const StyledWrapperTotal = styled.div`
  margin-top: 30px;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 16px;

  h3 {
    margin: 0 0 10px;
  }

  p {
    font-size: 14px;
    color: #6b6b6b;
    margin-bottom: 20px;
  }
`;

export const StyledWrapperTotalButton = styled.div`
  display: flex;
  gap: 10px;
`;

import styled from "styled-components";

export const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
  gap: 0px 100px;

  li {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    width: 650px;
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
    color: var(--color-text-muted);
  }

  p:last-child {
    font-size: 14px;
    font-weight: 400;
    background-color: var(--color-accent);
    color: var(--color-surface);
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
  color: var(--color-text);
  margin-left: 10px;
`;

export const StyledWrapperTotal = styled.div`
  margin-top: 30px;
  background: var(--color-bg-subtle);
  padding: 20px;
  border-radius: 16px;

  h3 {
    margin: 0 0 10px;
  }

  p {
    font-size: 14px;
    color: var(--color-text-muted);
    margin-bottom: 20px;
  }
`;

export const StyledWrapperTotalButton = styled.div`
  display: flex;
  gap: 10px;
`;

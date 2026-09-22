import { JSX } from "react";
import { StyledWrapperLending, StyledWrapperCenter, StyledLeft, StyledRight } from "./conteiner-main.styles";

export const ContainerMain = ({ left, right, allWidth }: { left?: JSX.Element; right?: JSX.Element; allWidth?: JSX.Element; }) => {
  return (
    <>
      {!allWidth ?
        <StyledWrapperLending>
          <StyledLeft>
            {left}
          </StyledLeft>
          <StyledRight>
            {right}
          </StyledRight>
        </StyledWrapperLending> :
        <StyledWrapperCenter>
          {allWidth}
        </StyledWrapperCenter>}
    </>
  );
};

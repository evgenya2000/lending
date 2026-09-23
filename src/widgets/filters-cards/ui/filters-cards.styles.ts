import styled from "styled-components";

import { media } from "@/shared/lib/styles";

export const StyledWrapperLoader = styled.h3`
  padding: 40px 0 0 30px;

  /* На узких экранах фильтры показываются в панели на всю ширину. */
  ${media.down("sm")`
    padding: 40px 30px 0;
  `}
`;

export const StyledFiltersForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px 0 0 30px;
  margin-bottom: 16px;
  gap: 20px;

  /* На узких экранах фильтры показываются в панели на всю ширину. */
  ${media.down("sm")`
    padding: 40px 30px 0;
  `}
`;

export const StyledPrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledFields = styled.div`
  display: flex;
  gap: 4px;

  /* На узких экранах поля цены сжимаются, чтобы не выходить за пределы панели. */
  ${media.down("sm")`
    input {
      flex: 1;
      min-width: 0;
    }
  `}
`;

export const StyledFieldset = styled.fieldset`
  border: none;
`;

export const StyledButtons = styled.div`
  display: flex;
  gap: 8px;
`;

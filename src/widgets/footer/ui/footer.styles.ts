import styled from 'styled-components';

export const StyledFooter = styled.footer`
  background-color: #ffe3e3;
  height: 130px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: end;
  padding: 40px 30px 20px 30px;
  color: #6b6b6b;
  font-size: 14px;
`;

export const StyledWrapperIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    display: block;
    width: 30px;
    height: 30px;

    svg {
      color: #96669a;
      transition: all 0.3s ease;
    }
  }

  a:nth-child(2) {
    svg:hover {
      color: #24a1ca;
    }
  }
  a:nth-child(3) {
    svg:hover {
      color: #0e75fe;
    }
  }
  a:nth-child(4) {
    svg:hover {
      color: #ff7171;
    }
  }
  a:nth-child(5) {
    svg:hover {
      color: #000000;
    }
  }
`;

export const StyledCopyMessage = styled.span<{ $visible?: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

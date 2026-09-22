'use client';

import styled from 'styled-components';

export const CopyMessage = styled.span<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

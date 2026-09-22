'use client';

import styled from 'styled-components';

export const Product3dWrapper = styled.div<{ $width?: number; $height?: number }>`
  width: ${({ $width }) => $width ?? 150}px;
  height: ${({ $height }) => $height ?? 150}px;
  max-height: ${({ $height }) => $height ?? 150}px;
  position: relative;
  flex-shrink: 0;
  flex-grow: 1;
`;

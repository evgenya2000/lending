'use client';

import styled from 'styled-components';

import { media } from '@/shared/lib/styles';

export const PageContainer = styled.div`
  padding: 40px 30px 20px;
  width: 100%;

  ${media.down('md')`
    padding: 24px 16px 16px;
  `}
`;

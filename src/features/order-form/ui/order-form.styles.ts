import styled from 'styled-components';
import { Input } from '@/shared/ui/input/input';

export const StyledWrapper = styled.div`
  width: 500px;

  p {
    font-size: 14px;
    margin-bottom: 16px;
    color: #6b6b6b;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const StyledFormInput = styled(Input)`
  width: 100%;
`;

export const StyledRadioGroup = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

export const StyledRadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #444;
  cursor: pointer;
  user-select: none;

  input[type='radio'] {
    accent-color: #96669a;
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
  }
`;

export const StyledError = styled.span`
  color: #e74c3c;
  font-size: 12px;
  line-height: 1.2;
`;

export const StyledButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

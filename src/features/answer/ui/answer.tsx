'use client';
import { StyledAnswerContainer } from './answer.styles';

export const Answer = ({ text }: { text: string }) => {
    console.log(text);
    return (
        <StyledAnswerContainer>
            <h3>{text}</h3>
        </StyledAnswerContainer>
    );
};

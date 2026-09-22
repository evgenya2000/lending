import { memo } from 'react';
import {
  StyledCheckbox,
  StyledOptionLabel,
  StyledOptionsContainer,
} from './taste-checkbox.styles';

export const TasteCheckboxes = memo(({ 
  tastes, 
  selected, 
  onChange 
}: { 
  tastes: string[], 
  selected: string[], 
  onChange: (newValue: string[]) => void 
}) => {
  const handleToggle = (taste: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newValue = checked
      ? [...selected, taste]
      : selected.filter((v) => v !== taste);
    onChange(newValue);
  };

  return (
    <StyledOptionsContainer>
      {tastes.map((taste) => {
        const isActive = selected.includes(taste);
        return (
          <StyledOptionLabel key={taste} $active={isActive}>
            <StyledCheckbox
              type="checkbox"
              value={taste}
              checked={isActive}
              onChange={handleToggle(taste)}
            />
            {taste}
          </StyledOptionLabel>
        );
      })}
    </StyledOptionsContainer>
  );
});

TasteCheckboxes.displayName = 'TasteCheckboxes';

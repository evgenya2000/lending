import { memo } from 'react';
import styles from "./filters.module.css";

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
    <div className={styles.optionsContainer}>
      {tastes.map((taste) => {
        const isActive = selected.includes(taste);
        return (
          <label
            key={taste}
            className={`${styles.optionLabel} ${isActive ? styles.optionLabelActive : ''}`}
          >
            <input
              type="checkbox"
              className={styles.checkbox}
              value={taste}
              checked={isActive}
              onChange={handleToggle(taste)}
            />
            {taste}
          </label>
        );
      })}
    </div>
  );
});

TasteCheckboxes.displayName = 'TasteCheckboxes';
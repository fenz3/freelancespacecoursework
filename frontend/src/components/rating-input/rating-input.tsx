import { FaStar } from 'react-icons/fa';
import {
  useController,
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors?: FieldErrors<T>;
  name: FieldPath<T>;
  isDisabled?: boolean;
  label: string;
};

const RatingInput = <T extends FieldValues>({
  control,
  errors,
  name,
  isDisabled = false,
  label,
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });
  const error = errors ? errors[name]?.message : undefined;

  const handleClick = (rating: number) => {
    if (!isDisabled) {
      field.onChange(rating);
    }
  };

  return (
    <label className={styles['rating-label']}>
      <span className={styles['rating-label-text']}>{label}</span>
      <div className={styles['rating-container']}>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={starValue}
              className={getValidClassNames(
                styles['rating-star'],
                starValue <= field.value && styles['filled-star'],
                isDisabled && styles['disabled-star']
              )}
              onClick={() => handleClick(starValue)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(starValue);
                }
              }}
              tabIndex={isDisabled ? -1 : 0}
              role="button"
              aria-label={`${starValue} star`}
            />
          );
        })}
      </div>
      {error && (
        <span className={styles['rating-error']}>{error as string}</span>
      )}
    </label>
  );
};

export { RatingInput };

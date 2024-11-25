import {
  useController,
  Control,
  FieldValues,
  FieldPath,
  FieldErrors,
  PathValue,
} from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

type Properties<T extends FieldValues> = {
  label: string;
  name: FieldPath<T>;
  control?: Control<T, null>;
  options: { value: PathValue<T, FieldPath<T>>; label: string }[];
  errors?: FieldErrors<T>;
};

const RadioInput = <T extends FieldValues>({
  label,
  name,
  control,
  options,
  errors,
}: Properties<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: options[0]?.value,
  });

  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);

  return (
    <div className={styles.radioGroup}>
      <span className={getValidClassNames(styles['input-label-text'])}>
        {label}
      </span>
      {options.map((option, index) => (
        <label key={index} className={styles.radioLabel}>
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className={styles.radioInput}
          />
          {option.label}
        </label>
      ))}
      {hasError && <span className={styles['error']}>{error as string}</span>}
    </div>
  );
};

export default RadioInput;

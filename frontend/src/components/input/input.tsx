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
  autoComplete?: string;
  control?: Control<T, null>;
  errors?: FieldErrors<T>;
  isDisabled?: boolean;
  isLabelHidden?: boolean;
  isReadOnly?: boolean;
  label: string;
  leftIcon?: JSX.Element;
  name: FieldPath<T>;
  placeholder?: string;
  rightIcon?: JSX.Element;
  rowsCount?: number;
  type?: 'email' | 'password' | 'search' | 'text' | 'file' | 'number';
  onImageChange?: (file: File | null) => void; // callback for handling image selection
};

const Input = <T extends FieldValues>({
  autoComplete,
  control,
  errors,
  isDisabled = false,
  isLabelHidden = false,
  isReadOnly = false,
  label,
  leftIcon,
  name,
  placeholder = '',
  rightIcon,
  rowsCount,
  type = 'text',
  onImageChange,
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });
  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);
  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);
  const isTextArea = Boolean(rowsCount);
  const isFileInput = type === 'file';
  const isNumberInput = type === 'number';

  const inputClassNames = getValidClassNames(
    styles['input-field'],
    isTextArea && styles['input-textarea'],
    hasLeftIcon && styles['with-left-icon'],
    hasRightIcon && styles['with-right-icon']
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onImageChange?.(file);
    field.onChange(file);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (isNumberInput) {
      field.onChange(e.target.value ? Number(e.target.value) : '');
    } else {
      field.onChange(e.target.value);
    }
  };

  return (
    <label className={styles['input-label']}>
      <span
        className={getValidClassNames(
          styles['input-label-text'],
          isLabelHidden && 'visually-hidden'
        )}
      >
        {label}
      </span>
      <div className={styles['input-container']}>
        {hasLeftIcon && (
          <div
            className={getValidClassNames(
              styles['input-icon'],
              styles['input-icon-left']
            )}
          >
            {leftIcon}
          </div>
        )}

        {isTextArea ? (
          <textarea
            className={inputClassNames}
            disabled={isDisabled}
            name={field.name}
            onChange={field.onChange}
            placeholder={placeholder}
            readOnly={isReadOnly}
            rows={rowsCount}
            value={field.value}
          />
        ) : (
          <input
            autoComplete={isFileInput ? undefined : autoComplete}
            className={inputClassNames}
            disabled={isDisabled}
            name={field.name}
            onChange={isFileInput ? handleFileChange : handleChange}
            placeholder={placeholder}
            readOnly={isReadOnly}
            type={type}
            value={isFileInput ? undefined : field.value}
          />
        )}

        {hasRightIcon && (
          <div
            className={getValidClassNames(
              styles['input-icon'],
              styles['input-icon-right']
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>

      {hasError && (
        <span className={styles['input-error']}>{error as string}</span>
      )}
    </label>
  );
};

export { Input };

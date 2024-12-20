import { useState, useEffect } from 'react';
import {
  useController,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

interface Properties<T extends FieldValues> {
  control: Control<T, null>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  label: string;
  placeholder: string;
  maxImages?: number;
}

const ImageInput = <T extends FieldValues>({
  control,
  name,
  errors,
  label,
  placeholder,
  maxImages = 5,
}: Properties<T>) => {
  const { field } = useController({ name, control });
  const [previews, setPreviews] = useState<(File | string)[]>([]);

  useEffect(() => {
    if (maxImages === 1 && field.value) {
      // Handle single file for maxImages = 1
      setPreviews([field.value]);
    } else if (Array.isArray(field.value)) {
      // Handle multiple files for maxImages > 1
      setPreviews(field.value);
    }
  }, [field.value, maxImages]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, maxImages); // Limit to maxImages

    if (maxImages === 1) {
      // Replace the current file for single-file input
      const singleFile = newFiles[0];
      setPreviews([singleFile]);
      field.onChange(singleFile);
    } else {
      // Add new files for multi-file input
      setPreviews((prev) => [...prev, ...newFiles].slice(0, maxImages));
      field.onChange([...previews, ...newFiles].slice(0, maxImages));
    }
  };

  const removePreview = (index: number) => {
    if (maxImages === 1) {
      // Clear single file
      setPreviews([]);
      field.onChange(null);
    } else {
      // Remove selected file for multi-file input
      const updatedPreviews = previews.filter((_, i) => i !== index);
      setPreviews(updatedPreviews);
      field.onChange(updatedPreviews);
    }
  };

  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);
  const isMaxImagesReached = previews.length >= maxImages;

  return (
    <div className={styles['uploader']}>
      <span className={getValidClassNames(styles['input-label-text'])}>
        {label}
      </span>
      <label
        className={`${styles['label']} ${isMaxImagesReached ? styles['disabled'] : ''}`}
      >
        {placeholder || 'Choose images'}
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          multiple={maxImages > 1} // Allow multiple selection only if maxImages > 1
          className={styles['input']}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={isMaxImagesReached}
        />
      </label>
      <div className={styles.previewContainer}>
        {previews.map((item, index) => (
          <div key={index} className={styles.preview}>
            {typeof item === 'string' ? (
              <img
                src={item}
                alt={`preview-${index}`}
                className={styles.image}
              />
            ) : (
              <img
                src={URL.createObjectURL(item)}
                alt={`preview-${index}`}
                className={styles.image}
              />
            )}
            <button
              type="button"
              onClick={() => removePreview(index)}
              className={styles.removeButton}
            >
              x
            </button>
          </div>
        ))}
      </div>
      {isMaxImagesReached && (
        <span className={styles['limit-message']}>
          Maximum of {maxImages} {maxImages === 1 ? 'image' : 'images'} reached.
        </span>
      )}
      {hasError && (
        <span className={styles['input-error']}>{error as string}</span>
      )}
    </div>
  );
};

export { ImageInput };

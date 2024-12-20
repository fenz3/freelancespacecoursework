import { useState, useEffect } from 'react';
import {
  useController,
  Control,
  FieldErrors,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import { FiFile, FiTrash2 } from 'react-icons/fi';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';

interface Properties<T extends FieldValues> {
  control: Control<T, null>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  label: string;
  placeholder: string;
  maxFiles?: number;
}

const FileInput = <T extends FieldValues>({
  control,
  name,
  errors,
  label,
  placeholder,
  maxFiles = 5,
}: Properties<T>) => {
  const { field } = useController({ name, control });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (Array.isArray(field.value)) {
      setFiles(field.value);
    } else if (field.value) {
      setFiles([field.value]);
    }
  }, [field.value]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles = Array.from(fileList).slice(0, maxFiles);
    if (maxFiles === 1) {
      setFiles([newFiles[0]]);
      field.onChange(newFiles[0]);
    } else {
      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
      setFiles(updatedFiles);
      field.onChange(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    if (maxFiles === 1) {
      setFiles([]);
      field.onChange(null);
    } else {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      field.onChange(updatedFiles);
    }
  };

  const error = errors ? errors[name]?.message : undefined;
  const hasError = Boolean(error);
  const isMaxFilesReached = files.length >= maxFiles;

  return (
    <div className={styles['uploader']}>
      <span className={getValidClassNames(styles['input-label-text'])}>
        {label}
      </span>
      <label
        className={`${styles['label']} ${
          isMaxFilesReached ? styles['disabled'] : ''
        }`}
      >
        {placeholder || 'Choose files'}
        <input
          type="file"
          multiple={maxFiles > 1}
          className={styles['input']}
          onChange={(e) => handleFiles(e.target.files)}
          disabled={isMaxFilesReached}
        />
      </label>
      <div className={styles.filesContainer}>
        {files.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <FiFile className={styles.fileIcon} /> {/* File icon */}
            <span className={styles.fileName}>{file.name}</span>
            <button
              type="button"
              onClick={() => removeFile(index)}
              className={styles.removeButton}
            >
              <FiTrash2 /> {/* Trash icon */}
            </button>
          </div>
        ))}
      </div>
      {isMaxFilesReached && (
        <span className={styles['limit-message']}>
          Maximum of {maxFiles} {maxFiles === 1 ? 'file' : 'files'} reached.
        </span>
      )}
      {hasError && (
        <span className={styles['input-error']}>{error as string}</span>
      )}
    </div>
  );
};

export { FileInput };

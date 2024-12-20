import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Search } from '~/components/components.js';

import styles from './styles.module.css';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  onChange: (search: string) => void;
};

const ServicesSearch = <T extends FieldValues>({
  control,
  errors,
  name,
  onChange,
}: Properties<T>): JSX.Element => {
  return (
    <div className={styles['search-container']}>
      <Search
        control={control}
        errors={errors}
        isLabelHidden
        label="Services search"
        name={name}
        onChange={onChange}
        placeholder="Enter title"
      />
    </div>
  );
};

export { ServicesSearch };

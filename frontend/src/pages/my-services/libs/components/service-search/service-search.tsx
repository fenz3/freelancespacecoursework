import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import styles from './styles.module.css';
import { Search } from '~/components/components';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  onChange: (search: string) => void;
};

const ServiceSearch = <T extends FieldValues>({
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
        label="Service search"
        name={name}
        onChange={onChange}
        placeholder="Enter service name"
      />
    </div>
  );
};

export { ServiceSearch };

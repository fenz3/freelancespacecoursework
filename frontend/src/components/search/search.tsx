import {
  useWatch,
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { SEARCH_TIMEOUT } from './libs/constants/constants.js';
import { useEffect } from 'react';
import { Icon, Input } from '../components.js';
import { initDebounce } from '~/helpers/helpers.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  isLabelHidden: boolean;
  label: string;
  name: FieldPath<T>;
  onChange: (search: string) => void;
  placeholder: string;
};

const Search = <T extends FieldValues>({
  control,
  errors,
  isLabelHidden,
  label,
  name,
  onChange,
  placeholder,
}: Properties<T>): JSX.Element => {
  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    const debouncedOnChange = initDebounce(() => {
      onChange(value ?? '');
    }, SEARCH_TIMEOUT);

    debouncedOnChange(value);

    return (): void => {
      debouncedOnChange.clear();
    };
  }, [onChange, value]);

  return (
    <Input
      control={control}
      errors={errors}
      isLabelHidden={isLabelHidden}
      label={label}
      leftIcon={<Icon height={20} name="search" width={20} />}
      name={name}
      placeholder={placeholder}
      type="search"
    />
  );
};

export { Search };

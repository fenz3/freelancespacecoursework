import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  useController,
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

type Properties<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  errors?: FieldErrors<T>;
  showTimeSelect?: boolean;
  label?: string;
  placeholder?: string;
};

const DateTimeInput = <T extends FieldValues>({
  control,
  name,
  errors,
  showTimeSelect = false,
  label,
  placeholder,
}: Properties<T>) => {
  const {
    field: { value, onChange, ref },
  } = useController({ name, control });

  const error = errors?.[name]?.message;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label>{label}</label>}
      <DatePicker
        selected={value}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeIntervals={15}
        dateFormat={showTimeSelect ? 'Pp' : 'P'}
        placeholderText={placeholder}
        ref={ref}
      />
      {error && (
        <p style={{ color: 'red', fontSize: '0.875rem' }}>{error as string}</p>
      )}
    </div>
  );
};

export default DateTimeInput;

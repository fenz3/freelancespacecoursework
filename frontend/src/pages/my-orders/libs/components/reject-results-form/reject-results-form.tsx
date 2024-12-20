import {
  RejectTaskRequestDTO,
  RejectTaskRequestSchema,
} from '~/common/types/types.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { Button, Input } from '~/components/components.js';
import styles from './styles.module.css';
import { DEFAULT_REJECT_RESULTS_PAYLOAD } from './libs/constants/constants';

type Properties = {
  onSubmit: (payload: RejectTaskRequestDTO) => void;
};

const RejectResultsForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<RejectTaskRequestDTO>({
    defaultValues: DEFAULT_REJECT_RESULTS_PAYLOAD,
    validationSchema: RejectTaskRequestSchema,
  });

  const rejectNotesValue = useWatch({
    control,
    defaultValue: '',
    name: 'rejectNotes',
  });

  const isRejectNotesCounterShown = !errors['rejectNotes']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: RejectTaskRequestDTO) => {
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Reject Notes"
          name="rejectNotes"
          rowsCount={4}
        />
        {isRejectNotesCounterShown && (
          <span className={styles['description-counter']}>
            {rejectNotesValue.length}/{2000}
          </span>
        )}
      </div>
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { RejectResultsForm };

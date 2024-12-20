import {
  DeliverTaskRequestDTO,
  DeliverTaskRequestSchema,
} from '~/common/types/types.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { Button, FileInput, Input } from '~/components/components.js';
import styles from './styles.module.css';
import { DEFAULT_DELIVER_TASK_PAYLOAD } from './libs/constants/constants';

type Properties = {
  onSubmit: (payload: DeliverTaskRequestDTO) => void;
};

const DeliverTaskForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<DeliverTaskRequestDTO>({
    defaultValues: DEFAULT_DELIVER_TASK_PAYLOAD,
    validationSchema: DeliverTaskRequestSchema,
  });

  const deliveryResponseValue = useWatch({
    control,
    defaultValue: '',
    name: 'deliveryResponse',
  });

  const isDeliveryResponseCounterShown = !errors['deliveryResponse']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: DeliverTaskRequestDTO) => {
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Delivery Response"
          name="deliveryResponse"
          rowsCount={4}
        />
        {isDeliveryResponseCounterShown && (
          <span className={styles['description-counter']}>
            {deliveryResponseValue.length}/{2000}
          </span>
        )}
      </div>
      <div className={styles['taskDetailsFiles-wrapper']}>
        <FileInput
          placeholder="Upload files"
          name="deliveryResponseFiles"
          label="Delivery Response Files"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { DeliverTaskForm };

import {
  OrderCreateRequestDTO,
  OrderCreateRequestSchema,
  ServiceDTO,
} from '~/common/types/types.js';
import { DEFAULT_ORDER_CREATE_PAYLOAD } from './libs/constants/constants.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { Button, FileInput, Input } from '~/components/components.js';
import styles from './styles.module.css';
type Properties = {
  onSubmit: (payload: OrderCreateRequestDTO) => void;
  service: ServiceDTO;
};

const BuyNowForm = ({ onSubmit, service }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<OrderCreateRequestDTO>({
    defaultValues: {
      ...DEFAULT_ORDER_CREATE_PAYLOAD,
      price: service.startingPrice,
    },
    validationSchema: OrderCreateRequestSchema,
  });

  const taskDetailsValue = useWatch({
    control,
    defaultValue: '',
    name: 'taskDetails',
  });

  const isTaskDetailsCounterShown = !errors['taskDetails']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: OrderCreateRequestDTO) => {
      formData.serviceId = service.id;
      formData.freelancerId = service.creatorId;
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <div className={styles['price-time-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Price (Starting price of Service is minimal value), $"
          name="price"
          type="number"
          min={service.startingPrice}
        />
        <Input
          control={control}
          errors={errors}
          label="Delivery time, days"
          name="deliveryTime"
          type="number"
        />
      </div>
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Task Details"
          name="taskDetails"
          rowsCount={4}
        />
        {isTaskDetailsCounterShown && (
          <span className={styles['description-counter']}>
            {taskDetailsValue.length}/{2000}
          </span>
        )}
      </div>
      <div className={styles['taskDetailsFiles-wrapper']}>
        <FileInput
          placeholder="Upload files"
          name="taskDetailsFiles"
          label="Details Files"
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

export { BuyNowForm };

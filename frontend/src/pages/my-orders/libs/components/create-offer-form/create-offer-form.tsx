import {
  OfferCreateRequestDTO,
  OfferCreateRequestSchema,
} from '~/common/types/types.js';
import { DEFAULT_OFFER_CREATE_PAYLOAD } from './libs/constants/constants.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { Button, FileInput, Input } from '~/components/components.js';
import styles from './styles.module.css';

type Properties = {
  onSubmit: (payload: OfferCreateRequestDTO) => void;
  serviceStartingPrice: number;
  orderId: number;
};

const CreateOfferForm = ({
  onSubmit,
  serviceStartingPrice,
  orderId,
}: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<OfferCreateRequestDTO>({
    defaultValues: {
      ...DEFAULT_OFFER_CREATE_PAYLOAD,
      price: serviceStartingPrice,
    },
    validationSchema: OfferCreateRequestSchema,
  });

  const taskDetailsValue = useWatch({
    control,
    defaultValue: '',
    name: 'details',
  });

  const isTaskDetailsCounterShown = !errors['details']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: OfferCreateRequestDTO) => {
      formData.orderId = orderId;
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
          min={serviceStartingPrice}
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
          label="Details"
          name="details"
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
          name="detailsFiles"
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

export { CreateOfferForm };

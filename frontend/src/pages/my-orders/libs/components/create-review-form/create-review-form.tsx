import { CreateReviewDTO, CreateReviewSchema } from '~/common/types/types.js';
import { useAppForm } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { Button, Input, RatingInput } from '~/components/components.js';
import styles from './styles.module.css';
import { DEFAULT_CREATE_REVIEW_PAYLOAD } from './libs/constants/constants';

type Properties = {
  onSubmit: (payload: CreateReviewDTO) => void;
};

const CreateReviewForm = ({ onSubmit }: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<CreateReviewDTO>({
    defaultValues: DEFAULT_CREATE_REVIEW_PAYLOAD,
    validationSchema: CreateReviewSchema,
  });

  const detailsValue = useWatch({
    control,
    defaultValue: '',
    name: 'details',
  });

  const isDetailsCounterShown = !errors['details']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: CreateReviewDTO) => {
      onSubmit(formData);
    })(event_);
  };

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <RatingInput
        control={control}
        errors={errors}
        name="rating"
        label="Rate this service"
      />
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Details"
          name="details"
          rowsCount={3}
        />
        {isDetailsCounterShown && (
          <span className={styles['description-counter']}>
            {detailsValue ? detailsValue.length : 0}/{500}
          </span>
        )}
      </div>
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { CreateReviewForm };

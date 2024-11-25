import {
  ServiceCreateRequestDto,
  ServiceCreateSchema,
} from '~/common/types/types.js';
import {
  DEFAULT_SERVICE_CREATE_PAYLOAD,
} from './libs/constants/constants.js';
import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks.js';
import { useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import {
  Button,
  ImageInput,
  Input,
  Loader,
  Select,
} from '~/components/components.js';
import styles from './styles.module.css';
import { getOptions } from './libs/helpers/helpers.js';
import { actions as categoryActions } from '~/store/categories/categories.js';
import { DataStatus } from '~/common/enums/enums.js';

type Properties = {
  onSubmit: (payload: ServiceCreateRequestDto) => void;
};

const ServiceCreateForm = ({ onSubmit }: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  const {
    categoriesStatus,
    categories,
  } = useAppSelector(({ categories }) => categories);

  useEffect(() => {
    void dispatch(categoryActions.getAll());
  }, [dispatch]);

  const { control, errors, handleSubmit } = useAppForm<ServiceCreateRequestDto>(
    {
      defaultValues: DEFAULT_SERVICE_CREATE_PAYLOAD,
      validationSchema: ServiceCreateSchema,
    }
  );

  const descriptionValue = useWatch({
    control,
    defaultValue: '',
    name: 'description',
  });

  const isDescriptionCounterShown = !errors['description']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: ServiceCreateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  const categoryOptions = useMemo(() => getOptions(categories), [categories]);

  const isLoading =
    categoriesStatus === DataStatus.IDLE ||
    categoriesStatus === DataStatus.PENDING;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="given-name"
        control={control}
        errors={errors}
        label="Title"
        name="title"
      />
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Description"
          name="description"
          rowsCount={4}
        />
        {isDescriptionCounterShown && (
          <span className={styles['description-counter']}>
            {descriptionValue.length}/{2000}
          </span>
        )}
      </div>
      <div className={styles['attributes-wrapper']}>
        <Select
          control={control}
          errors={errors}
          label="Category"
          name="categoryId"
          options={categoryOptions}
          placeholder="Choose category"
        />
      </div>
      <div className={styles['images-wrapper']}>
        <ImageInput
          placeholder="Choose images"
          name="coverImages"
          label="Upload Images"
          control={control}
          errors={errors}
        />
      </div>
      <Input
        control={control}
        errors={errors}
        label="Price per session, USD"
        name="startingPrice"
        type="number"
      />
      <Input
        control={control}
        errors={errors}
        label="Length of session, min"
        name="deliveryTime"
        type="number"
      />
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { ServiceCreateForm };

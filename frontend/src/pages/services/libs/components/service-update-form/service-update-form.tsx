import {
  ServiceCreateRequestDto,
  ServiceCreateSchema,
  ServiceDto,
} from '~/common/types/types';
import styles from './styles.module.css';
import { useAppDispatch, useAppForm, useAppSelector } from '~/hooks/hooks';
import { useWatch } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import {
  Button,
  ImageInput,
  Input,
  Loader,
  Select,
} from '~/components/components';
import { actions as attributeActions } from '~/store/categories/categories.js';
import { DataStatus } from '~/common/enums/enums';
import { getOptions } from '../service-create-form/libs/helpers/helpers';

type Properties = {
  onSubmit: (payload: ServiceCreateRequestDto) => void;
  service: ServiceDto;
};

const ServiceUpdateForm = ({ onSubmit, service }: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } = useAppForm<ServiceCreateRequestDto>(
    {
      defaultValues: service,
      validationSchema: ServiceCreateSchema,
    }
  );

  const {
    categoriesStatus,
    categories,
  } = useAppSelector(({ categories }) => categories);

  useEffect(() => {
    void dispatch(attributeActions.getAll());
  }, [dispatch]);

  const descriptionValue = useWatch({
    control,
    defaultValue: service.description,
    name: 'description',
  });

  const isDescriptionCounterShown = !errors['description']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit((formData: ServiceCreateRequestDto) => {
      onSubmit(formData);
    })(event_);
  };

  const categoryOptions = useMemo(() => getOptions(categories), [categories]);

  const isLoading =
    categoriesStatus === DataStatus.IDLE ||
    categoriesStatus === DataStatus.PENDING

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="name"
        control={control}
        errors={errors}
        label="Name"
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
            {descriptionValue?.length}/{2000}
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
        <Button label="Update" type="submit" />
      </div>
    </form>
  );
};

export { ServiceUpdateForm };

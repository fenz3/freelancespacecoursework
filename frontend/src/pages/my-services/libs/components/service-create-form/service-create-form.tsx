import {
  ServiceCreateRequestDTO,
  ServiceCreateSchema,
} from '~/common/types/types.js';
import { DEFAULT_SERVICE_CREATE_PAYLOAD } from './libs/constants/constants.js';
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
  onSubmit: (payload: ServiceCreateRequestDTO) => void;
};

const ServiceCreateForm = ({ onSubmit }: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  const { categoriesStatus, categories, subcategories, subcategoriesStatus } =
    useAppSelector(({ categories }) => categories);

  useEffect(() => {
    void dispatch(categoryActions.getAll());
  }, [dispatch]);

  const { control, errors, handleSubmit, handleErrorSet } =
    useAppForm<ServiceCreateRequestDTO>({
      defaultValues: DEFAULT_SERVICE_CREATE_PAYLOAD,
      validationSchema: ServiceCreateSchema,
    });

  const categoryId = useWatch({
    control,
    name: 'categoryId',
    defaultValue: 0,
  });

  useEffect(() => {
    if (categoryId) {
      void dispatch(
        categoryActions.getSubcategoriesByCategoryId(categoryId.toString())
      );
    }
  }, [categoryId, dispatch]);

  const descriptionValue = useWatch({
    control,
    defaultValue: '',
    name: 'description',
  });

  const serviceDetailsValue = useWatch({
    control,
    defaultValue: '',
    name: 'serviceDetails',
  });

  const isDescriptionCounterShown = !errors['description']?.message;
  const isSkillsRequiredCounterShown = !errors['serviceDetails']?.message;

  const handleFormSubmit = (event_: React.BaseSyntheticEvent): void => {
    void handleSubmit(async (formData: ServiceCreateRequestDTO) => {
      let skillsArray: string[] = [];
      if (typeof formData.serviceDetails === 'string') {
        skillsArray = formData.serviceDetails
          .split(',')
          .map((skill) => skill.trim())
          .filter((skill) => skill);
      } else if (Array.isArray(formData.serviceDetails)) {
        skillsArray = formData.serviceDetails;
      }

      if (!skillsArray || skillsArray.length === 0) {
        handleErrorSet('serviceDetails', {
          type: 'manual',
          message:
            'Please provide at least one skill in the format: photoshop, illustrator, adobe',
        });
        return;
      }

      formData.serviceDetails = skillsArray;
      formData.serviceDetails = skillsArray;
      onSubmit(formData);
    })(event_);
  };

  const categoryOptions = useMemo(() => getOptions(categories), [categories]);
  const subcategoryOptions = useMemo(
    () => getOptions(subcategories),
    [subcategories]
  );

  const isLoading =
    categoriesStatus === DataStatus.IDLE ||
    categoriesStatus === DataStatus.PENDING ||
    subcategoriesStatus === DataStatus.PENDING;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
      <Input
        autoComplete="given-name"
        control={control}
        errors={errors}
        label="Service Title"
        name="title"
      />
      <div className={styles['attributes-wrapper']}>
        <Select
          control={control}
          errors={errors}
          label="Category"
          name="categoryId"
          options={categoryOptions}
          placeholder="Choose category"
        />
        <Select
          control={control}
          errors={errors}
          label="Subcategory"
          name="subcategoryId"
          options={subcategoryOptions}
          placeholder="Choose subcategory"
        />
      </div>
      <div className={styles['description-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Service Description"
          name="description"
          rowsCount={4}
        />
        {isDescriptionCounterShown && (
          <span className={styles['description-counter']}>
            {descriptionValue.length}/{2000}
          </span>
        )}
      </div>
      <div className={styles['images-wrapper']}>
        <ImageInput
          placeholder="Upload images"
          name="coverImages"
          label="Cover images"
          control={control}
          errors={errors}
        />
      </div>
      <div className={styles['price-time-wrapper']}>
        <Input
          control={control}
          errors={errors}
          label="Starting price, $"
          name="startingPrice"
          type="number"
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
          label="What this service offers (small phrases separated by commas)"
          name="serviceDetails"
          rowsCount={2}
        />
        {isSkillsRequiredCounterShown && (
          <span className={styles['description-counter']}>
            {serviceDetailsValue.length}/{100}
          </span>
        )}
      </div>
      <div className={styles['button-wrapper']}>
        <Button label="Create" type="submit" />
      </div>
    </form>
  );
};

export { ServiceCreateForm };

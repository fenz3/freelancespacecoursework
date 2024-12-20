import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useSearchFilters,
} from '~/hooks/hooks.js';
import { actions as serviceActions } from '~/store/services/services.js';
import { actions as categoryActions } from '~/store/categories/categories.js';

import { ServiceCard, ServicesSearch } from './libs/components/components.js';
import styles from './styles.module.css';
import { DataStatus, QueryParameterName } from '~/common/enums/app/app.js';
import { useCallback, useEffect, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { usePagination } from '~/hooks/use-pagination/use-pagination.hook.js';
import { EMPTY_LENGTH } from '~/common/constants/constants.js';
import {
  Input,
  Loader,
  PageLayout,
  Pagination,
  Select,
} from '~/components/components.js';
import { getOptions } from './libs/helpers/helpers.js';
import RadioInput from '~/components/radio-input/radio-input.js';
import { deliveryTimeOptions } from './libs/constants/constants.js';
import { FaTrophy } from 'react-icons/fa';

const BrowseServices = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { onSearch, search } = useSearchFilters();

  const { categories, subcategories } = useAppSelector(
    ({ categories }) => categories
  );

  const { services, status, totalItems } = useAppSelector(
    ({ services }) => services
  );

  useEffect(() => {
    void dispatch(categoryActions.getAll());
  }, [dispatch]);

  const [searchParameters] = useSearchParams();
  const categoryIdQueryParameter = searchParameters.get(
    QueryParameterName.CATEGORY_ID
  );
  const subcategoryIdQueryParameter = searchParameters.get(
    QueryParameterName.SUBCATEGORY_ID
  );
  const deliveryTimeQueryParameter = searchParameters.get(
    QueryParameterName.DELIVERY_TIME
  );
  const minPriceQueryParameter = searchParameters.get(
    QueryParameterName.MIN_PRICE
  );
  const maxPriceQueryParameter = searchParameters.get(
    QueryParameterName.MAX_PRICE
  );

  const { onSearch: onSelectCategoryId } = useSearchFilters({
    queryParameterName: QueryParameterName.CATEGORY_ID,
  });

  const { onSearch: onSelectSubcategoryId } = useSearchFilters({
    queryParameterName: QueryParameterName.SUBCATEGORY_ID,
  });

  const { onSearch: onSelectDeliveryTime } = useSearchFilters({
    queryParameterName: QueryParameterName.DELIVERY_TIME,
  });

  const { onSearch: onSelectMinPrice } = useSearchFilters({
    queryParameterName: QueryParameterName.MIN_PRICE,
  });

  const { onSearch: onSelectMaxPrice } = useSearchFilters({
    queryParameterName: QueryParameterName.MAX_PRICE,
  });

  const { control, errors } = useAppForm({
    defaultValues: {
      categoryId: categoryIdQueryParameter
        ? Number(categoryIdQueryParameter)
        : null,
      subcategoryId: subcategoryIdQueryParameter
        ? Number(subcategoryIdQueryParameter)
        : null,
      deliveryTime: deliveryTimeQueryParameter
        ? Number(deliveryTimeQueryParameter)
        : null,
      minPrice: minPriceQueryParameter ? Number(minPriceQueryParameter) : 0,
      maxPrice: maxPriceQueryParameter ? Number(maxPriceQueryParameter) : 0,
      search,
    },
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch]
  );

  const { onPageChange, onPageSizeChange, page, pageSize } = usePagination({
    queryParameterPrefix: 'service',
    totalItemsCount: totalItems,
  });

  const categoryIdValue = useWatch({ control, name: 'categoryId' });
  const subcategoryIdValue = useWatch({ control, name: 'subcategoryId' });
  const deliveryTimeValue = useWatch({ control, name: 'deliveryTime' });
  const minPriceValue = useWatch({ control, name: 'minPrice' });
  const maxPriceValue = useWatch({ control, name: 'maxPrice' });

  useEffect(() => {
    if (categoryIdValue) {
      void dispatch(
        categoryActions.getSubcategoriesByCategoryId(categoryIdValue.toString())
      );
    }
  }, [categories, categoryIdValue, dispatch]);

  useEffect(() => {
    onSelectCategoryId(categoryIdValue ? String(categoryIdValue) : '');
    onSelectSubcategoryId(subcategoryIdValue ? String(subcategoryIdValue) : '');
    onSelectDeliveryTime(deliveryTimeValue ? String(deliveryTimeValue) : '');
    onSelectMinPrice(minPriceValue ? String(minPriceValue) : '');
    onSelectMaxPrice(maxPriceValue ? String(maxPriceValue) : '');
  }, [
    categoryIdValue,
    deliveryTimeValue,
    maxPriceValue,
    minPriceValue,
    onSelectCategoryId,
    onSelectDeliveryTime,
    onSelectMaxPrice,
    onSelectMinPrice,
    onSelectSubcategoryId,
    subcategoryIdValue,
  ]);

  const handleLoadServices = useCallback(
    (
      categoryId?: null | number,
      subcategoryId?: null | number,
      deliveryTime?: null | number,
      minPrice?: null | number,
      maxPrice?: null | number
    ) => {
      void dispatch(
        serviceActions.getAll({
          name: search,
          categoryId: categoryId ?? undefined,
          subcategoryId: subcategoryId ?? undefined,
          deliveryTime: deliveryTime ?? undefined,
          minPrice: minPrice ?? undefined,
          maxPrice: maxPrice ?? undefined,
          page,
          pageSize,
        })
      );
    },
    [dispatch, page, pageSize, search]
  );

  useEffect(() => {
    handleLoadServices(
      categoryIdValue,
      subcategoryIdValue,
      deliveryTimeValue,
      minPriceValue,
      maxPriceValue
    );
  }, [
    handleLoadServices,
    categoryIdValue,
    subcategoryIdValue,
    deliveryTimeValue,
    minPriceValue,
    maxPriceValue,
  ]);

  const categoryOptions = useMemo(() => getOptions(categories), [categories]);
  const subcategoryOptions = useMemo(
    () => getOptions(subcategories),
    [subcategories]
  );

  const hasServices = totalItems !== EMPTY_LENGTH;
  const hasSearch = search.length !== EMPTY_LENGTH;
  const emptyPlaceholderMessage =
    hasSearch ||
    maxPriceValue ||
    minPriceValue ||
    deliveryTimeValue ||
    subcategoryIdValue ||
    categoryIdValue
      ? 'No services found matching your search criteria. Please try different keywords.'
      : 'No services created yet. Create the first service now.';
  const isLoading =
    status === DataStatus.IDLE ||
    (status === DataStatus.PENDING && !hasServices);

  return (
    <PageLayout isBigMargin>
      <h1 className={styles['title']}>Available Services</h1>
      <div className={styles['container']}>
        <section className={styles['filters']}>
          <form className={styles['filters-form']}>
            <ServicesSearch
              control={control}
              errors={errors}
              name="search"
              onChange={handleSearchChange}
            />
            <div className={styles['select-wrapper']}>
              <Select
                control={control}
                isClearable
                isSearchable
                label="Category"
                name="categoryId"
                options={categoryOptions}
                placeholder="Select category"
                isLabelHidden
              />
              <Select
                control={control}
                isClearable
                isSearchable
                label="Subcategory"
                name="subcategoryId"
                options={subcategoryOptions}
                placeholder="Select subcategory"
                isLabelHidden
              />
            </div>
            <div className={styles['price-wrapper']}>
              <Input
                control={control}
                errors={errors}
                label="Min Price, $"
                name="minPrice"
                type="number"
                min={1}
                max={maxPriceValue || 999999}
              />
              <Input
                control={control}
                errors={errors}
                label="Max Price, $"
                name="maxPrice"
                type="number"
                min={minPriceValue || 1}
                max={999999}
              />
            </div>
            <RadioInput
              label="Delivery Time"
              name="deliveryTime"
              control={control}
              errors={errors}
              options={deliveryTimeOptions}
            />
          </form>
        </section>
        <div></div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles['services']}>
            {hasServices && (categoryIdValue || subcategoryIdValue) && (
              <div className={styles['top-service']}>
                <div className={styles['top-service-title']}>
                  <FaTrophy /> <h1>Top Performing Service</h1>
                </div>
                <p className={styles['top-service-description']}>
                  This service is pinned due to highest number and quality of
                  sales in this category.
                </p>
              </div>
            )}
            <div className={styles['services-list']}>
              {hasServices && (categoryIdValue || subcategoryIdValue) && (
                <ServiceCard key={services[0].id} service={services[0]} isTop />
              )}
            </div>
            <div className={styles['divider']} />
            <div className={styles['services-list']}>
              {hasServices ? (
                services
                  .filter(
                    (_, index) =>
                      !(
                        page === 1 &&
                        (categoryIdValue || subcategoryIdValue) &&
                        index === 0
                      )
                  )
                  .map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))
              ) : (
                <p className={styles['empty-placeholder']}>
                  {emptyPlaceholderMessage}
                </p>
              )}
            </div>
            <Pagination
              background="primary"
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              page={page}
              pageSize={pageSize}
              totalItemsCount={totalItems}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export { BrowseServices };

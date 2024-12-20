import { IconButton } from '../components.js';
import { FIRST_PAGE, PAGE_INCREMENT } from './libs/constants/constants.js';
import styles from './styles.module.css';
import { useAppForm } from '~/hooks/hooks.js';
import { useCallback, useEffect, useMemo } from 'react';
import { calculateTotalPages } from '~/hooks/use-pagination/libs/helpers/helpers.js';
import { useWatch } from 'react-hook-form';
import { getValidClassNames } from '~/helpers/helpers.js';

type Properties = {
  background?: 'primary' | 'secondary';
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  page: number;
  pageSize: number;
  totalItemsCount: number;
};

type FormData = {
  pageSize: number;
};

const Pagination = ({
  background = 'primary',
  onPageChange,
  onPageSizeChange,
  page,
  pageSize,
  totalItemsCount,
}: Properties): JSX.Element => {
  const { control } = useAppForm<FormData>({
    defaultValues: {
      pageSize,
    },
  });

  const totalPages = useMemo(
    () => calculateTotalPages(pageSize, totalItemsCount),
    [totalItemsCount, pageSize]
  );

  const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPreviousPage = useMemo(() => page > FIRST_PAGE, [page]);

  const { pageSize: changedPageSize } = useWatch({ control });

  useEffect(() => {
    const newPageSize = changedPageSize as number;
    onPageSizeChange(newPageSize);
  }, [changedPageSize, onPageSizeChange]);

  const handleFirstPageClick = useCallback(() => {
    onPageChange(FIRST_PAGE);
  }, [onPageChange]);

  const handlePreviousPageClick = useCallback(() => {
    onPageChange(page - PAGE_INCREMENT);
  }, [onPageChange, page]);

  const handleNextPageClick = useCallback(() => {
    onPageChange(page + PAGE_INCREMENT);
  }, [onPageChange, page]);

  const handleLastPageClick = useCallback(() => {
    onPageChange(totalPages);
  }, [onPageChange, totalPages]);

  const isBackgroundSecondary = background === 'secondary';

  return (
    <div
      className={getValidClassNames(
        styles['main-container'],
        styles['container'],
        isBackgroundSecondary && styles['container-secondary']
      )}
    >
      <div
        className={getValidClassNames(
          styles['pagination-container'],
          styles['container']
        )}
      >
        <p className={styles['text']}>
          Page {page} of {totalPages}
        </p>
        <div
          className={getValidClassNames(
            styles['change-page-buttons-container'],
            styles['container']
          )}
        >
          <IconButton
            iconName="leftDoubleArrow"
            isDisabled={!hasPreviousPage}
            label="Open first page"
            onClick={handleFirstPageClick}
            variant="outlined"
          />
          <IconButton
            iconName="leftArrow"
            isDisabled={!hasPreviousPage}
            label="Open previous page"
            onClick={handlePreviousPageClick}
            variant="outlined"
          />
          <IconButton
            iconName="rightArrow"
            isDisabled={!hasNextPage}
            label="Open next page"
            onClick={handleNextPageClick}
            variant="outlined"
          />
          <IconButton
            iconName="rightDoubleArrow"
            isDisabled={!hasNextPage}
            label="Open last page"
            onClick={handleLastPageClick}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
};

export { Pagination };

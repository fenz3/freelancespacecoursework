import { NotFound } from '~/pages/not-found/not-found.jsx';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { useParams } from 'react-router-dom';
import { actions as serviceActions } from '~/store/services/services';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { PageLayout } from '~/components/components';
import { ImageDisplay } from './libs/components/components';
import Rating from './libs/components/rating/rating';

const Service = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id: serviceId } = useParams<{ id: string }>();

  const { service, serviceStatus } = useAppSelector(
    ({ services }) => services
  );


  useEffect(() => {
    if (serviceId) {
      void dispatch(serviceActions.getById(serviceId));
    }
  }, [dispatch, serviceId]);

  const isLoading =
    serviceStatus === DataStatus.PENDING || serviceStatus === DataStatus.IDLE;

  const isRejected = serviceStatus === DataStatus.ERROR;

  const hasListing = service !== null && service !== undefined;

  if (isRejected) {
    return <NotFound />;
  }

  return (
    <PageLayout isLoading={isLoading}>
      {hasListing && (
        <>
          <div className={styles['service-images']}>
            <ImageDisplay images={service.coverImages} />
          </div>
          <div className={styles['service-layout']}>
            <div className={styles['service-info']}>
              <div className={styles['service-title']}>
                <h1 className={styles['title']}>{service.title}</h1>
              </div>
              <div className={styles['service-category']}>
                <h2 className={styles['category']}>
                  {service.category?.name}
                </h2>
              </div>
            </div>
            <div className={styles['service-description-layout']}>
              <h3 className={styles['service-description-title']}>
                Description
              </h3>
              <p className={styles['service-description']}>
                {service.description}
              </p>
            </div>
            <div className={styles['service-filters-layout']}>
              <h3 className={styles['service-filters-title']}>
                What this skill offers
              </h3>
            </div>
            <div className={styles['service-rating-layout']}>
              <h3 className={styles['service-rating-title']}>Rating</h3>
              <div className={styles['service-rating']}>
                <Rating rating={service.rating} />
                <p>
                  {service.rating}{' '}
                  {service.ratingCount === 1 ? 'review' : 'reviews'}
                </p>
              </div>
            </div>
            <div className={styles['service-creator-layout']}>
              <h3 className={styles['service-creator-title']}>Creator</h3>
              <div className={styles['service-creator']}>{service.creator?.firstName + " " + service.creator?.lastName}</div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export { Service };

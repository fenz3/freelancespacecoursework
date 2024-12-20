import styles from './styles.module.css';
import { useAppDispatch, useAppSelector, useModal } from '~/hooks/hooks';
import { useParams } from 'react-router-dom';
import { actions as serviceActions } from '~/store/services/services';
import { actions as orderActions } from '~/store/orders/orders';
import { useCallback, useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import {
  Button,
  ImageDisplay,
  LargeImageDisplay,
  Modal,
  PageLayout,
} from '~/components/components';
import { BuyNowForm, Rating } from './libs/components/components';
import { OrderCreateRequestDTO } from 'shared/src';
import { UserRoles } from '~/common/enums/app/user-roles.enum';
import { FaUser } from 'react-icons/fa';

const Service = () => {
  const dispatch = useAppDispatch();
  const { id: serviceId } = useParams<{ id: string }>();

  const { service, serviceStatus } = useAppSelector(({ services }) => services);

  const { orderCreateStatus } = useAppSelector(({ orders }) => orders);

  const user = useAppSelector(({ auth }) => auth.user);

  useEffect(() => {
    if (serviceId) {
      void dispatch(serviceActions.getById(serviceId));
    }
  }, [dispatch, serviceId]);

  const {
    isOpened: isBuyModalOpen,
    onClose: handleBuyModalClose,
    onOpen: handleBuyModalOpen,
  } = useModal();

  const handleBuySubmit = useCallback(
    (payload: OrderCreateRequestDTO) => {
      void dispatch(orderActions.create(payload));
    },
    [dispatch]
  );

  useEffect(() => {
    if (orderCreateStatus === DataStatus.SUCCESS) {
      handleBuyModalClose();
    }
  }, [handleBuyModalClose, orderCreateStatus]);

  const isLoading =
    serviceStatus === DataStatus.PENDING || serviceStatus === DataStatus.IDLE;

  const hasService = service !== null && service !== undefined;

  if (!user) {
    return null;
  }

  return (
    <PageLayout isLoading={isLoading} isBigMargin>
      {hasService && (
        <>
          <div className={styles['container']}>
            <div className={styles['main']}>
              <div className={styles['images']}>
                <ImageDisplay images={service.coverImages} />
              </div>
              <h1 className={styles['title']}>{service.title}</h1>
              <div className={styles['category-rating']}>
                <span className={styles['category']}>
                  {service.category?.name + ' • ' + service.subcategory?.name}
                </span>
                <div className={styles['rating']}>
                  <Rating rating={service.rating} />
                  <p>
                    {' (' +
                      (service.rating !== 0 ? service.rating.toFixed(2) : '-') +
                      '/5 ' +
                      ' • ' +
                      service.ratingCount +
                      (service.ratingCount === 1 ? ' review)' : ' reviews)')}
                  </p>
                </div>
              </div>
              <div className={styles['description-layout']}>
                <h3 className={styles['description-title']}>
                  About this service
                </h3>
                <p className={styles['description']}>{service.description}</p>
              </div>
              <div className={styles['description-layout']}>
                <h3 className={styles['description-title']}>My portfolio</h3>
                {service.creator?.portfolioItems?.length ? (
                  <LargeImageDisplay images={service.creator?.portfolioItems} />
                ) : (
                  <p className={styles['portfolio-placeholder']}>
                    No portfolio items added.
                  </p>
                )}
              </div>
              <div className={styles['description-layout']}>
                <h3 className={styles['description-title']}>Reviews</h3>
                {service.reviews?.length ? (
                  service.reviews.map((review) => (
                    <div key={review.id} className={styles['review-layout']}>
                      <div className={styles['review']}>
                        <div className={styles['review-photo']}>
                          <img
                            src={review.creator?.photoUrl}
                            alt="Creator Profile Image"
                          />
                        </div>
                        <div className={styles['review-creator']}>
                          <h2>
                            {review.creator?.firstName +
                              ' ' +
                              review.creator?.lastName}
                          </h2>
                          <div className={styles['review-rating']}>
                            <Rating rating={review.rating} isSmall />
                          </div>
                        </div>
                      </div>
                      <div className={styles['review-details']}>
                        <p>{review.details}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={styles['portfolio-placeholder']}>
                    No reviews for now.
                  </p>
                )}
              </div>
            </div>
            <aside className={styles['sidebar']}>
              <div className={styles['price']}>
                <h1>{'$' + service.startingPrice}</h1>
                <h2>Starting price</h2>
              </div>
              {user.role !== UserRoles.FREELANCER && (
                <div className={styles['buttons']}>
                  <Button label="Buy now" onClick={handleBuyModalOpen} />
                  <Button label="Contact me" variant="outlined" />
                </div>
              )}
              <div className={styles['details-layout']}>
                <h3 className={styles['details-title']}>About this service</h3>
                <ul className={styles['details']}>
                  <li>
                    {'✔ ' +
                      'Delivery in ' +
                      service.deliveryTime +
                      (service.deliveryTime === 1 ? ' day' : ' days')}
                  </li>
                  {service.serviceDetails.map((detail) => (
                    <li key={detail}>{'✔ ' + detail}</li>
                  ))}
                </ul>
              </div>
              <div className={styles['creator-layout']}>
                <div className={styles['creator-photo']}>
                  {service.creator?.photoUrl ? (
                    <img
                      src={service.creator?.photoUrl}
                      alt="Creator Profile Image"
                    />
                  ) : (
                    <FaUser />
                  )}
                </div>
                <div className={styles['creator-data']}>
                  <h2>
                    {service.creator?.firstName +
                      ' ' +
                      service.creator?.lastName}
                  </h2>
                  <h3>{service.creator?.profession}</h3>
                </div>
              </div>
            </aside>
          </div>
          <Modal
            isOpened={isBuyModalOpen}
            onClose={handleBuyModalClose}
            title="Order a service"
          >
            <BuyNowForm onSubmit={handleBuySubmit} service={service} />
          </Modal>
        </>
      )}
    </PageLayout>
  );
};

export { Service };

import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import {
  CreateReviewDTO,
  DeliverTaskRequestDTO,
  OfferCreateRequestDTO,
  OfferStatus,
  OrderDTO,
  OrderStatus,
  RejectTaskRequestDTO,
} from '~/common/types/types';
import { formatDate } from '~/utils/date/date';
import { actions as offerActions } from '~/store/offers/offers';
import { actions as orderActions } from '~/store/orders/orders';
import { useAppDispatch, useAppSelector, useModal } from '~/hooks/hooks';
import { DataStatus } from '~/common/enums/enums';
import { Button, ConfirmationModal, Modal } from '~/components/components';
import { UserRoles } from '~/common/enums/app/user-roles.enum';
import {
  CreateOfferForm,
  CreateReviewForm,
  DeliverTaskForm,
  OrderHistory,
  RejectResultsForm,
} from '../components';
import { FaUser } from 'react-icons/fa';

type Properties = {
  order: OrderDTO;
};

const OrderCard: React.FC<Properties> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const user = useAppSelector(({ auth }) => auth.user);

  const { offerCreateStatus } = useAppSelector(({ offers }) => offers);

  const { orderDeliveryStatus, reviewCreateStatus } = useAppSelector(
    ({ orders }) => orders
  );

  const {
    isOpened: isRejectOfferConfirmationModalOpen,
    onClose: handleRejectOfferConfirmationModalClose,
    onOpen: handleRejectOfferConfirmationModalOpen,
  } = useModal();

  const {
    isOpened: isCreateOfferModalOpen,
    onClose: handleCreateOfferModalClose,
    onOpen: handleCreateOfferModalOpen,
  } = useModal();

  const {
    isOpened: isDeliverTaskModalOpen,
    onClose: handleDeliverTaskModalClose,
    onOpen: handleDeliverTaskModalOpen,
  } = useModal();

  const {
    isOpened: isRejectResultsModalOpen,
    onClose: handleRejectResultsModalClose,
    onOpen: handleRejectResultsModalOpen,
  } = useModal();

  const {
    isOpened: isCreateReviewModalOpen,
    onClose: handleCreateReviewModalClose,
    onOpen: handleCreateReviewModalOpen,
  } = useModal();

  const handleRejectOfferClick = useCallback(() => {
    handleRejectOfferConfirmationModalOpen();
  }, [handleRejectOfferConfirmationModalOpen]);

  const handleOfferCreateSubmit = useCallback(
    (payload: OfferCreateRequestDTO) => {
      void dispatch(offerActions.create(payload));
    },
    [dispatch]
  );

  const handleDeliverTaskSubmit = useCallback(
    (payload: DeliverTaskRequestDTO) => {
      void dispatch(orderActions.deliverTask({ id: order.id, data: payload }));
    },
    [dispatch, order.id]
  );

  const handleRejectResultsSubmit = useCallback(
    (payload: RejectTaskRequestDTO) => {
      void dispatch(orderActions.rejectTask({ id: order.id, data: payload }));
    },
    [dispatch, order.id]
  );

  const handleCreateReviewSubmit = useCallback(
    (payload: CreateReviewDTO) => {
      void dispatch(
        orderActions.createReview({ orderId: order.id, data: payload })
      );
    },
    [dispatch, order.id]
  );

  useEffect(() => {
    if (offerCreateStatus === DataStatus.SUCCESS) {
      handleCreateOfferModalClose();
      void dispatch(orderActions.getAll());
    }
  }, [dispatch, handleCreateOfferModalClose, offerCreateStatus]);

  useEffect(() => {
    if (orderDeliveryStatus === DataStatus.SUCCESS) {
      handleDeliverTaskModalClose();
      void dispatch(orderActions.getAll());
    }
  }, [dispatch, handleDeliverTaskModalClose, orderDeliveryStatus]);

  useEffect(() => {
    if (orderDeliveryStatus === DataStatus.SUCCESS) {
      handleRejectResultsModalClose();
      void dispatch(orderActions.getAll());
    }
  }, [dispatch, handleRejectResultsModalClose, orderDeliveryStatus]);

  useEffect(() => {
    if (reviewCreateStatus === DataStatus.SUCCESS) {
      handleCreateReviewModalClose();
      void dispatch(orderActions.getAll());
    }
  }, [dispatch, handleCreateReviewModalClose, reviewCreateStatus]);

  if (!order.offers) {
    return null;
  }

  const offer = order.offers[0];

  const handleRejectOfferConfirm = async () => {
    await dispatch(offerActions.reject(offer.id));
    await dispatch(orderActions.getAll());
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleAcceptOffer = async () => {
    await dispatch(offerActions.accept(offer.id));
    await dispatch(orderActions.getAll());
  };

  const handleAcceptResults = async () => {
    await dispatch(orderActions.acceptTask({ id: order.id }));
    await dispatch(orderActions.getAll());
    handleCreateReviewModalOpen();
  };

  if (!user) {
    return null;
  }

  const isClient = user.role === UserRoles.CLIENT;
  const isMyOffer = offer.creatorId === user.id;
  const isOfferAccepted = offer.status === OfferStatus.ACCEPTED;
  const isOfferRejected = offer.status === OfferStatus.REJECTED;
  const isOrderCompleted = order.status === OrderStatus.COMPLETED;
  const isTaskResultSubmitted = order.status === OrderStatus.RESULTS_SUBMITTED;
  const isTaskResultRejected = order.status === OrderStatus.RESULTS_REJECTED;
  const isRejectedBefore = order.rejectNotes?.length;

  return (
    <div className={styles.card}>
      <div className={styles.summary} onClick={handleToggleExpand}>
        <div className={styles.mainInfo}>
          <h4 className={styles.title}>
            {'№ ' + order.id + ' • ' + order.service?.title}
          </h4>
          <h5 className={styles.subtitle}>
            {'Created on ' + formatDate(new Date(order.createdAt))}
          </h5>
        </div>
        <div className={styles.status + ' ' + order.status}>{order.status}</div>
        <div className={styles.arrow}>
          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
        </div>
      </div>

      {isExpanded && (
        <div>
          <div className={styles.expanded}>
            <div className={styles.details}>
              <div className={styles.service}>
                <div className={styles['service-image']}>
                  <img
                    src={order.service?.coverImages[0]}
                    alt="service image"
                  />
                </div>
                <div>
                  <h3>{order.service?.title}</h3>
                  <h3>
                    {order.service?.category?.name +
                      ' • ' +
                      order.service?.subcategory?.name}
                  </h3>
                </div>
              </div>
              <div className={styles.user}>
                <h2 className={styles['block-title']}>
                  {!isClient ? 'Client' : 'Freelancer'}
                </h2>
                <div className={styles['user-block']}>
                  <div className={styles['user-image']}>
                    {isClient ? (
                      order.freelancer?.photoUrl ? (
                        <img src={order.freelancer.photoUrl} alt="user image" />
                      ) : (
                        <FaUser />
                      )
                    ) : order.client?.photoUrl ? (
                      <img src={order.client.photoUrl} alt="user image" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className={styles['user-info']}>
                    {!isClient ? (
                      <h3>
                        {order.client?.firstName + ' ' + order.client?.lastName}
                      </h3>
                    ) : (
                      <>
                        <h3>
                          {order.freelancer?.firstName +
                            ' ' +
                            order.freelancer?.lastName}
                        </h3>
                        <h3>{order.freelancer?.profession}</h3>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <h3 className={styles['price']}>
                <span className={styles['block-title']}>Price:</span>{' '}
                {isOfferAccepted ? '$' + order.price : 'Not decided yet'}
              </h3>
              <h3 className={styles['deliverytime']}>
                <span className={styles['block-title']}>Delivery Time:</span>{' '}
                {isOfferAccepted
                  ? order.deliveryTime + ' days'
                  : 'Not decided yet'}
              </h3>
              <div className={styles['taskdetails']}>
                <h3 className={styles['block-title']}>Task Details</h3>
                <p>{order.taskDetails}</p>
              </div>
              <div className={styles['taskdetailsfiles']}>
                <h3 className={styles['block-title']}>Details Files</h3>
                <ul>
                  {order.taskDetailsFiles ? (
                    order.taskDetailsFiles?.map((url) => (
                      <li key={url}>
                        <a href={url}>{url.split('uploads/')[1]}</a>
                      </li>
                    ))
                  ) : (
                    <p>No details files specified.</p>
                  )}
                </ul>
              </div>
            </div>
            <div className={styles.offer}>
              <div className={styles['offer-title-status']}>
                <h1 className={styles['offer-title']}>
                  {isMyOffer ? 'My Offer' : 'Latest Offer'}
                </h1>
                <div className={styles['offer-status']}>
                  {isOfferAccepted && (
                    <h3 className="OFFER_ACCEPTED">Accepted</h3>
                  )}
                  {isOfferRejected && <h3 className="REJECTED">Rejected</h3>}
                  {!isOfferAccepted && !isOfferRejected && (
                    <h3 className="OFFER_SUBMITTED">Awaiting response</h3>
                  )}
                </div>
              </div>
              <h3 className={styles['price']}>
                <span className={styles['block-title']}>Price:</span>
                {' $' + offer.price}
              </h3>
              <h3 className={styles['deliverytime']}>
                <span className={styles['block-title']}>Delivery Time:</span>{' '}
                {offer.deliveryTime + ' days'}
              </h3>
              <div className={styles['taskdetails']}>
                <h3 className={styles['block-title']}>Details</h3>
                <p>{offer.details}</p>
              </div>
              <div className={styles['taskdetailsfiles']}>
                <h3 className={styles['block-title']}>Details Files</h3>
                <ul>
                  {offer.detailsFiles ? (
                    offer.detailsFiles?.map((url) => (
                      <li key={url}>
                        <a href={url}>{url.split('uploads/')[1]}</a>
                      </li>
                    ))
                  ) : (
                    <p>No details files specified.</p>
                  )}
                </ul>
              </div>
              {!isOfferAccepted && !isOfferRejected && !isMyOffer && (
                <div className={styles['offer-buttons']}>
                  <Button
                    label="Counter the Offer"
                    onClick={handleCreateOfferModalOpen}
                  />
                  <Button
                    label="Accept the Offer"
                    variant="outlined"
                    onClick={handleAcceptOffer}
                  />
                  <Button
                    label="Reject the Offer"
                    variant="danger"
                    onClick={handleRejectOfferClick}
                  />
                </div>
              )}
            </div>
            <div className={styles['order-history']}>
              <OrderHistory
                history={order.statusHistory}
                orderCreatedAt={order.createdAt}
                deliveryTime={order.deliveryTime}
              />
            </div>
          </div>
          <div className={styles['divider']} />
          <div className={styles['lower-details']}>
            {(isTaskResultSubmitted ||
              isTaskResultRejected ||
              isOrderCompleted) && (
              <div className={styles['task-results']}>
                <div className={styles['taskdetails']}>
                  <h3 className={styles['block-title']}>Task Results</h3>
                  <p>{order.deliveryResponse}</p>
                </div>
                <div className={styles['taskdetailsfiles']}>
                  <h3 className={styles['block-title']}>Task Results Files</h3>
                  <ul>
                    {order.deliveryResponseFiles ? (
                      order.deliveryResponseFiles?.map((url) => (
                        <li key={url}>
                          <a href={url}>{url.split('uploads/')[1]}</a>
                        </li>
                      ))
                    ) : (
                      <p>No details files specified.</p>
                    )}
                  </ul>
                </div>
                {isTaskResultRejected && (
                  <div className={styles['taskdetails']}>
                    <h3 className={styles['block-title']}>Reject Notes</h3>
                    <p>{order.rejectNotes}</p>
                  </div>
                )}
              </div>
            )}
            <div>
              {!isOrderCompleted && isOfferAccepted && (
                <div className={styles['deliver-result-button']}>
                  {!isClient && !isTaskResultSubmitted && (
                    <Button
                      label="Deliver results"
                      onClick={handleDeliverTaskModalOpen}
                    />
                  )}
                  {isClient && isTaskResultSubmitted && (
                    <div className={styles['client-results-buttons']}>
                      <Button
                        label="Accept results"
                        onClick={handleAcceptResults}
                      />
                      {!isRejectedBefore ? (
                        <Button
                          label="Reject results"
                          variant="danger"
                          onClick={handleRejectResultsModalOpen}
                        />
                      ) : (
                        <Button label="Contact support" variant="danger" />
                      )}
                    </div>
                  )}
                </div>
              )}
              {isOrderCompleted && isClient && !order.review && (
                <div className={styles['review-button']}>
                  <Button
                    label="Review service"
                    onClick={handleCreateReviewModalOpen}
                  />
                </div>
              )}
            </div>
          </div>
          <Modal
            isOpened={isCreateOfferModalOpen}
            onClose={handleCreateOfferModalClose}
            title="Create new offer"
          >
            <CreateOfferForm
              onSubmit={handleOfferCreateSubmit}
              serviceStartingPrice={order.service?.startingPrice || 0}
              orderId={order.id}
            />
          </Modal>
          <Modal
            isOpened={isDeliverTaskModalOpen}
            onClose={handleDeliverTaskModalClose}
            title="Deliver task results"
          >
            <DeliverTaskForm onSubmit={handleDeliverTaskSubmit} />
          </Modal>
          <Modal
            isOpened={isRejectResultsModalOpen}
            onClose={handleRejectResultsModalClose}
            title="Reject task results"
          >
            <RejectResultsForm onSubmit={handleRejectResultsSubmit} />
          </Modal>
          <Modal
            isOpened={isCreateReviewModalOpen}
            onClose={handleCreateReviewModalClose}
            title="Create review"
          >
            <CreateReviewForm onSubmit={handleCreateReviewSubmit} />
          </Modal>
          <ConfirmationModal
            content="The order will be closed. This action cannot be undone. Click 'Confirm' to proceed."
            isOpened={isRejectOfferConfirmationModalOpen}
            onClose={handleRejectOfferConfirmationModalClose}
            onConfirm={handleRejectOfferConfirm}
          />
        </div>
      )}
    </div>
  );
};

export { OrderCard };

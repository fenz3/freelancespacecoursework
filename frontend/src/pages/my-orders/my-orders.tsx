import { Loader, PageLayout } from '~/components/components.js';
import { EMPTY_LENGTH } from '~/common/constants/constants.js';
import { actions as orderActions } from '~/store/orders/orders';
import styles from './styles.module.css';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { OrderCard } from './libs/components/components';

const MyOrders = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { status, orders } = useAppSelector(({ orders }) => orders);

  const hasOrders = orders.length !== EMPTY_LENGTH;
  const emptyPlaceholderMessage =
    'No orders made yet. Buy your first service now.';

  useEffect(() => {
    void dispatch(orderActions.getAll());
  }, [dispatch]);

  const isLoading =
    status === DataStatus.IDLE || (status === DataStatus.PENDING && !hasOrders);

  return (
    <PageLayout>
      <header className={styles['services-header']}>
        <h1 className={styles['title']}>My Orders</h1>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['services-list']}>
          {hasOrders ? (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          ) : (
            <p className={styles['empty-placeholder']}>
              {emptyPlaceholderMessage}
            </p>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export { MyOrders };

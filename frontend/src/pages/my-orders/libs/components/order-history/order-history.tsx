import React from 'react';
import styles from './styles.module.css';
import { OrderStatus, OrderStatusHistory } from '~/common/types/types';

type Properties = {
  history: OrderStatusHistory[] | undefined;
  orderCreatedAt: Date;
  deliveryTime: number;
};

const OrderHistory: React.FC<Properties> = ({
  history,
  orderCreatedAt,
  deliveryTime,
}) => {
  if (!history) {
    return null;
  }

  const sortedHistory = [...history].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const offerAcceptedEntry = sortedHistory.find(
    (entry) => entry.status === 'OFFER_ACCEPTED'
  );
  const offerAcceptedDate = offerAcceptedEntry
    ? new Date(offerAcceptedEntry.createdAt)
    : null;
  const expirationDate = offerAcceptedDate
    ? new Date(offerAcceptedDate.getTime() + deliveryTime * 24 * 60 * 60 * 1000)
    : null;

  if (offerAcceptedDate && expirationDate && new Date() > expirationDate) {
    sortedHistory.push({
      id: -1,
      orderId: history[0].orderId,
      status: OrderStatus.EXPIRED,
      createdAt: expirationDate,
    });
  }

  const finalSortedHistory = sortedHistory.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.container}>
      <h3>Order Status History</h3>
      <ul className={styles.historyList}>
        {finalSortedHistory.map((entry) => (
          <li key={entry.id} className={entry.status}>
            <div className={styles.statusLabel}>{entry.status}</div>
            <div className={styles.timestamp}>
              {new Date(entry.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
        <li key={0} className="PENDING">
          <div className={styles.statusLabel}>PENDING</div>
          <div className={styles.timestamp}>
            {new Date(orderCreatedAt).toLocaleString()}
          </div>
        </li>
      </ul>
    </div>
  );
};

export { OrderHistory };

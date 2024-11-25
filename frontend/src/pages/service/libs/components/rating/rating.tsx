import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './styles.module.css';

type RatingProps = {
  rating: number | string;
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;

  const clampedRating = Math.min(Math.max(numericRating, 0), 5);

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className={styles.container}>
      {stars.map((star) => (
        <FaStar
          key={star}
          className={`${styles.star} ${star <= clampedRating ? styles.filled : ''}`}
        />
      ))}
    </div>
  );
};

export default Rating;

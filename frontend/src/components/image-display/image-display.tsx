import React, { useState } from 'react';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import {
  IoChevronBackCircleSharp,
  IoChevronForwardCircleSharp,
} from 'react-icons/io5';

type ImageSliderProps = {
  url?: string;
  images: string[] | undefined;
};

const ImageDisplay: React.FC<ImageSliderProps> = ({ url, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <NavLink to={url || '#'} key={index} className={styles.imageLink}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.image}
            />
          </NavLink>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className={`${styles.navButton} ${styles.leftButton}`}
      >
        <IoChevronBackCircleSharp size={30} />
      </button>
      <button
        onClick={handleNext}
        className={`${styles.navButton} ${styles.rightButton}`}
      >
        <IoChevronForwardCircleSharp size={30} />
      </button>

      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export { ImageDisplay };

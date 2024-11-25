import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from "./styles.module.css"

type ImageSliderProps = {
  images: string[] | undefined; // Array of image URLs
};

const ImageDisplay: React.FC<ImageSliderProps> = ({ images }) => {
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
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className={`${styles.navButton} ${styles.leftButton}`}
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className={`${styles.navButton} ${styles.rightButton}`}
      >
        <FaChevronRight size={20} />
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

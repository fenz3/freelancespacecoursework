import React, { useState } from 'react';
import styles from './styles.module.css'; // Import the CSS module

type Properties = {
  images: string[] | undefined;
};

const LargeImageDisplay: React.FC<Properties> = ({ images }) => {
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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleThumbnailClick = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  const getThumbnailImages = () => {
    const thumbnails = [];
    for (let i = 0; i < Math.min(6, images.length); i++) {
      thumbnails.push(images[(currentIndex + i) % images.length]);
    }
    return thumbnails;
  };

  return (
    <div className={styles.imageSliderContainer}>
      {/* Large Image Display */}
      <div className={styles.largeImageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Main Slide ${currentIndex}`}
          className={styles.largeImage}
        />
      </div>

      <div className={styles.thumbnailSlider}>
        {images.length >= 6 && (
          <button
            className={`${styles.sliderControl} ${styles.prev}`}
            onClick={handlePrev}
          >
            &#10094;
          </button>
        )}
        <div className={styles.thumbnailRow}>
          {getThumbnailImages().map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index}`}
              className={`${styles.thumbnailImage} ${
                index === 0 ? styles.activeThumbnail : ''
              }`}
              onClick={() =>
                handleThumbnailClick((currentIndex + index) % images.length)
              }
            />
          ))}
        </div>
        {images.length >= 6 && (
          <button
            className={`${styles.sliderControl} ${styles.next}`}
            onClick={handleNext}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export { LargeImageDisplay };

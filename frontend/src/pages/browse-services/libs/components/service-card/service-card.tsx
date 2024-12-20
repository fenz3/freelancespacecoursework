import { Link, NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { ServiceDTO } from '~/common/types/types';
import { configureString } from '~/helpers/helpers';
import { AppPath } from '~/common/enums/enums';
import { ImageDisplay } from '~/components/components';
import { FaStar, FaUser, FaTrophy } from 'react-icons/fa';

type Properties = {
  service: ServiceDTO;
  isTop?: boolean;
};

const ServiceCard = ({ service, isTop = false }: Properties): JSX.Element => {
  const serviceRoute = configureString(AppPath.SERVICE, {
    id: service.id.toString(),
  });

  return (
    <div
      className={`${styles['service-container']} ${
        isTop ? styles['service-top'] : ''
      }`}
    >
      <ImageDisplay images={service.coverImages} url={serviceRoute} />
      <div className={styles['service-text']}>
        <NavLink className={styles['service']} to={serviceRoute} />
        <div className={styles['service-creator']}>
          <div className={styles['creator-photo']}>
            {service.creator?.photoUrl ? (
              <img src={service.creator?.photoUrl} alt="Creator Image" />
            ) : (
              <FaUser />
            )}
          </div>
          <div className={styles['creator-data']}>
            <h2>
              {service.creator?.firstName + ' ' + service.creator?.lastName}
            </h2>
            <h3>{service.subcategory?.name}</h3>
          </div>
        </div>
        <Link to={serviceRoute} className={styles['service-name-link']}>
          <h1 className={styles['service-name']}>
            {isTop && <FaTrophy className={styles['trophy-icon']} />}
            {service.title}
          </h1>
        </Link>
        <div className={styles['service-rating']}>
          <FaStar />{' '}
          <p>
            {(service.rating !== 0 ? service.rating.toFixed(1) : '-') +
              ' • (' +
              service.ratingCount +
              (service.ratingCount === 1 ? ' review)' : ' reviews)')}
          </p>
        </div>
        <div className={styles['service-price']}>
          <h2>Starting at</h2>
          <h1>{'$' + service.startingPrice}</h1>
        </div>
      </div>
    </div>
  );
};

export { ServiceCard };

import { Link, NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { ServiceDTO } from '~/common/types/types';
import { configureString } from '~/helpers/helpers';
import { AppPath } from '~/common/enums/enums';
import { IconButton, ImageDisplay } from '~/components/components';

type Properties = {
  onDelete: (service: ServiceDTO) => void;
  onEdit: (service: ServiceDTO) => void;
  service: ServiceDTO;
};

const ServiceCard = ({ onDelete, service }: Properties): JSX.Element => {
  const serviceRoute = configureString(AppPath.SERVICE, {
    id: service.id.toString(),
  });

  const handleDeleteConfirm = () => {
    onDelete(service);
  };

  return (
    <>
      <div className={styles['service-container']}>
        <ImageDisplay images={service.coverImages} url={serviceRoute} />
        <div className={styles['service-text']}>
          <NavLink className={styles['service'] as string} to={serviceRoute} />
          <div>
            <div className={styles['service-name-price']}>
              <Link to={serviceRoute} className={styles['service-name-link']}>
                <h1 className={styles['service-name']}>{service.title}</h1>
              </Link>
              <h1 className={styles['service-price']}>
                {'$' + service.startingPrice}
              </h1>
            </div>
            <span className={styles['service-category']}>
              {service.category?.name + ' • ' + service.subcategory?.name}
            </span>
          </div>
          <div className={styles['delete-button-wrapper']}>
            <div className={styles['delete-button']}>
              <IconButton
                label=""
                iconName={'trashBin'}
                onClick={handleDeleteConfirm}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ServiceCard };

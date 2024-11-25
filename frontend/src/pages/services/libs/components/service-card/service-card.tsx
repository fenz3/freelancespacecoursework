import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';
import { ServiceDto } from '~/common/types/types';
import { configureString } from '~/helpers/helpers';
import { AppPath } from '~/common/enums/enums';
import { ServiceMenu } from '../service-menu/service-menu';

type Properties = {
  onDelete: (service: ServiceDto) => void;
  onEdit: (service: ServiceDto) => void;
  service: ServiceDto;
};

const ServiceCard = ({
  onDelete,
  onEdit,
  service,
}: Properties): JSX.Element => {
  const serviceRoute = configureString(AppPath.SERVICE, {
    id: service.id.toString(),
  });

  const handleEditClick = () => {
    onEdit(service);
  };

  const handleDeleteClick = () => {
    onDelete(service);
  };

  return (
    <div className={styles['service-container']}>
      <NavLink className={styles['service'] as string} to={serviceRoute} />
      <span className={styles['service-name']}>{service.title}</span>
      <ServiceMenu onDelete={handleDeleteClick} onEdit={handleEditClick} />
    </div>
  );
};

export { ServiceCard };

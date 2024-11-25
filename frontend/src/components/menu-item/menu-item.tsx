import { IconName } from '~/common/types/types';
import styles from './styles.module.css';
import { getValidClassNames } from '~/helpers/helpers';
import { NavLink } from 'react-router-dom';
import { Icon } from '../components';

type Properties = {
  href?: string | undefined;
  iconName: IconName;
  label: string;
  onClick?: () => void;
  variant?: 'danger' | 'primary';
};

const MenuItem = ({
  href,
  iconName,
  label,
  onClick,
  variant = 'primary',
}: Properties): JSX.Element => {
  const itemClassName = getValidClassNames(
    styles['menu-item'],
    styles[`menu-item-${variant}`]
  );

  if (href) {
    return (
      <NavLink className={itemClassName} to={href}>
        <Icon height={20} name={iconName} width={20} />
        <span className={styles['menu-item-text']}>{label}</span>
      </NavLink>
    );
  }

  return (
    <button
      aria-label={label}
      className={itemClassName}
      onClick={onClick}
      type="button"
    >
      <Icon height={20} name={iconName} width={20} />
      <span className={styles['menu-item-text']}>{label}</span>
    </button>
  );
};

export { MenuItem };

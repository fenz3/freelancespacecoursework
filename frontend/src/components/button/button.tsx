import { getValidClassNames } from '~/helpers/helpers';
import styles from './styles.module.css';
import { NavLink } from '../components';

type Properties = {
  href?: string | undefined;
  isDisabled?: boolean;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'danger' | 'default' | 'outlined';
};

const Button = ({
  href,
  isDisabled,
  label,
  onClick,
  type = 'button',
  variant = 'default',
}: Properties): JSX.Element => {
  const buttonClassName = getValidClassNames(
    styles['button'],
    styles[`button-${variant}`]
  );

  if (href) {
    return (
      <NavLink className={buttonClassName} to={href}>
        {label}
      </NavLink>
    );
  }

  return (
    <button
      className={buttonClassName}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

export { Button };

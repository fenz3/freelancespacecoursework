import logoSrc from '~/assets/images/logo.svg';

import { HeaderLink, UserPopover } from './libs/components/components.js';
import styles from './styles.module.css';
import { useAppSelector, usePopover } from '~/hooks/hooks.js';
import { AppPath } from '~/common/enums/enums.js';
import { Avatar, NavLink } from '../components.js';
import { useLocation } from 'react-router-dom';

const Header = (): JSX.Element => {
  const location = useLocation();
  const {
    isOpened: isUserOpened,
    onClose: onUserClose,
    onOpen: onUserOpen,
  } = usePopover();

  const authenticatedUser = useAppSelector(({ auth }) => auth.user);

  if (!authenticatedUser) {
    return <></>;
  }

  const { email, firstName, lastName } = authenticatedUser;

  const currentPath = location.pathname;

  return (
    <header className={styles['header']}>
      <NavLink className={styles['logo-link'] as string} to={AppPath.ROOT}>
        <img alt="logo" className={styles['logo-img']} src={logoSrc} />
      </NavLink>
      <div className={styles['header-links']}>
        {currentPath != AppPath.SERVICES && (
          <HeaderLink label="Browse Services" link={AppPath.SERVICES} />
        )}
        {currentPath != AppPath.MY_SERVICES && (
          <HeaderLink label="My Services" link={AppPath.MY_SERVICES} />
        )}
        <UserPopover
          email={email}
          isOpened={isUserOpened}
          name={firstName + " " + lastName}
          onClose={onUserClose}
        >
          <button
            className={styles['user-popover-trigger']}
            onClick={isUserOpened ? onUserClose : onUserOpen}
          >
            <Avatar name={firstName} />
          </button>
        </UserPopover>
      </div>
    </header>
  );
};

export { Header };

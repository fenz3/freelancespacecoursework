import logoSrc from '~/assets/images/logo.svg';

import { HeaderLink, UserPopover } from './libs/components/components.js';
import styles from './styles.module.css';
import { useAppSelector, usePopover } from '~/hooks/hooks.js';
import { AppPath } from '~/common/enums/enums.js';
import { Avatar, NavLink } from '../components.js';
import { useLocation } from 'react-router-dom';
import { getValidClassNames } from '~/helpers/helpers.js';
import { UserRoles } from '~/common/enums/app/app.js';

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

  const { firstName, lastName, photoUrl } = authenticatedUser;

  const currentPath = location.pathname;

  const isBigMargin =
    [AppPath.MY_SERVICES, AppPath.SERVICES, AppPath.PROFILE].some(
      (path) => path === location.pathname
    ) || currentPath.startsWith('/service/');

  return (
    <header
      className={getValidClassNames(styles['header'], {
        [styles['big-margin']]: isBigMargin,
      })}
    >
      <NavLink className={styles['logo-link'] as string} to={AppPath.ROOT}>
        <img alt="logo" className={styles['logo-img']} src={logoSrc} />
      </NavLink>
      <div className={styles['header-links']}>
        {currentPath != AppPath.SERVICES && (
          <HeaderLink label="Browse Services" link={AppPath.SERVICES} />
        )}
        {currentPath != AppPath.MY_SERVICES &&
          authenticatedUser.role !== UserRoles.CLIENT && (
            <HeaderLink label="My Services" link={AppPath.MY_SERVICES} />
          )}
        <HeaderLink label="My Orders" link={AppPath.MY_ORDERS} />
        <UserPopover
          isOpened={isUserOpened}
          name={firstName + ' ' + lastName}
          onClose={onUserClose}
        >
          <button
            className={styles['user-popover-trigger']}
            onClick={isUserOpened ? onUserClose : onUserOpen}
          >
            <Avatar name={firstName} imageUrl={photoUrl} />
          </button>
        </UserPopover>
      </div>
    </header>
  );
};

export { Header };

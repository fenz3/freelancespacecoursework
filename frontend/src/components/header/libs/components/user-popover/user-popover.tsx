import { NavLink } from 'react-router-dom';

import { actions as authActions } from '~/store/auth/auth';

import styles from './styles.module.css';
import { useAppDispatch } from '~/hooks/hooks';
import { Popover } from '~/components/components';
import { AppPath } from '~/common/enums/enums';

type Properties = {
  children: React.ReactNode;
  email: string;
  isOpened: boolean;
  name: string;
  onClose: () => void;
};

const UserPopover = ({
  children,
  email,
  isOpened,
  name,
  onClose,
}: Properties): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleLogout = (): void => {
    void dispatch(authActions.signOut());
  };

  return (
    <Popover
      content={
        <div className={styles['user-popover']}>
          <div className={styles['user-info']}>
            <p className={styles['user-name']}>{name}</p>
            <p className={styles['user-email']}>{email}</p>
          </div>
          <div className={styles['buttons']}>
            <NavLink
              className={styles['button'] as string}
              to={AppPath.PROFILE}
            >
              Profile
            </NavLink>
            <button className={styles['button']} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      }
      isOpened={isOpened}
      onClose={onClose}
    >
      {children}
    </Popover>
  );
};

export { UserPopover };

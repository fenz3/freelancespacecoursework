import { useAppSelector, useModal } from '~/hooks/hooks.js';
import { EditUserForm } from './libs/components/components.js';
import styles from './styles.module.css';
import {
  Button,
  Loader,
  Modal,
  PageLayout,
  LargeImageDisplay,
} from '~/components/components.js';
import { useEffect } from 'react';
import { DataStatus } from '~/common/enums/enums.js';
import { formatDate } from '~/utils/date/date.js';
import { UserRoles } from '~/common/enums/app/app.js';
import { FaUser } from 'react-icons/fa';

const Profile = (): JSX.Element => {
  const { user } = useAppSelector(({ auth }) => auth);
  const { updateStatus } = useAppSelector(({ users }) => users);

  const {
    isOpened: isEditModalOpen,
    onClose: handleEditModalClose,
    onOpen: handleEditModalOpen,
  } = useModal();

  useEffect(() => {
    if (updateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, updateStatus]);

  if (!user) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <div className={styles['profile-layout']}>
        <div className={styles['profile-header']}>
          <h1 className={styles['title']}>Profile</h1>
          <Button label="Update Profile" onClick={handleEditModalOpen} />
        </div>
        <div className={styles['profile-info']}>
          <div className={styles['profile-image-wrapper']}>
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                className={styles['profile-image']}
                alt="Profile Image"
              ></img>
            ) : (
              <FaUser />
            )}
          </div>
          <div className={styles['profile-text']}>
            <h1>{user.firstName + ' ' + user.lastName}</h1>
            <h2>{user.profession}</h2>
            <h3>
              {'Account creation date: ' + formatDate(new Date(user.createdAt))}
            </h3>
          </div>
        </div>
        <div className={styles['divider']} />
        {user.role !== UserRoles.CLIENT && (
          <>
            <h1 className={styles['title']}>Portfolio</h1>
            {user.portfolioItems?.length ? (
              <div className={styles['profile-portfolio']}>
                <LargeImageDisplay images={user.portfolioItems} />
              </div>
            ) : (
              <p className={styles['portfolio-placeholder']}>
                No portfolio items added.
              </p>
            )}
          </>
        )}
      </div>
      <Modal
        isOpened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update Profile"
      >
        <EditUserForm user={user} />
      </Modal>
    </PageLayout>
  );
};

export { Profile };

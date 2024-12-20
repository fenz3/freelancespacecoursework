import {
  Button,
  ConfirmationModal,
  Loader,
  Modal,
  PageLayout,
} from '~/components/components.js';
import { EMPTY_LENGTH } from '~/common/constants/constants.js';

import { actions as serviceActions } from '~/store/services/services.js';

import styles from './styles.module.css';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useModal,
  useSearchFilters,
} from '~/hooks/hooks';
import { useCallback, useEffect, useState } from 'react';
import { DataStatus } from '~/common/enums/enums';
import { ServiceCreateRequestDTO, ServiceDTO } from '~/common/types/types';
import {
  ServiceCard,
  ServiceCreateForm,
  ServiceSearch,
  ServiceUpdateForm,
} from './libs/components/components';

const MyServices = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { onSearch, search } = useSearchFilters();

  const [serviceToModifyId, setServiceToModifyId] = useState<null | string>(
    null
  );

  const {
    status,
    service,
    serviceCreateStatus,
    serviceDeleteStatus,
    serviceUpdateStatus,
    services,
    serviceStatus,
  } = useAppSelector(({ services }) => services);

  const authenticatedUser = useAppSelector(({ auth }) => auth.user);

  const { control, errors } = useAppForm({
    defaultValues: { search },
    mode: 'onChange',
  });

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearch(value);
    },
    [onSearch]
  );

  useEffect(() => {
    if (serviceToModifyId) {
      void dispatch(serviceActions.getById(String(serviceToModifyId)));
    }
  }, [dispatch, serviceToModifyId]);

  const hasServices = services.length !== EMPTY_LENGTH;
  const hasSearch = search.length !== EMPTY_LENGTH;
  const emptyPlaceholderMessage = hasSearch
    ? 'No services found matching your search criteria. Please try different keywords.'
    : 'No services created yet. Create the first service now.';

  const handleLoadServices = useCallback(
    (page: number, pageSize: number) => {
      void dispatch(
        serviceActions.getAll({
          name: search,
          creatorId: authenticatedUser?.id,
          page,
          pageSize,
        })
      );
    },
    [authenticatedUser?.id, dispatch, search]
  );

  useEffect(() => {
    handleLoadServices(1, 100);
  }, [handleLoadServices]);

  const {
    isOpened: isCreateModalOpen,
    onClose: handleCreateModalClose,
    onOpen: handleCreateModalOpen,
  } = useModal();
  const {
    isOpened: isEditModalOpen,
    onClose: handleEditModalClose,
    onOpen: handleEditModalOpen,
  } = useModal();
  const {
    isOpened: isDeleteConfirmationModalOpen,
    onClose: handleDeleteConfirmationModalClose,
    onOpen: handleDeleteConfirmationModalOpen,
  } = useModal();

  useEffect(() => {
    if (serviceCreateStatus === DataStatus.SUCCESS) {
      handleCreateModalClose();
    }
  }, [handleCreateModalClose, serviceCreateStatus]);

  useEffect(() => {
    if (serviceUpdateStatus === DataStatus.SUCCESS) {
      handleEditModalClose();
    }
  }, [handleEditModalClose, serviceUpdateStatus]);

  useEffect(() => {
    if (serviceDeleteStatus === DataStatus.SUCCESS) {
      handleDeleteConfirmationModalClose();
    }
  }, [handleDeleteConfirmationModalClose, serviceDeleteStatus]);

  const handleEditClick = useCallback(
    (service: ServiceDTO) => {
      setServiceToModifyId(service.id.toString());
      handleEditModalOpen();
    },
    [handleEditModalOpen]
  );

  const handleDeleteClick = useCallback(
    (service: ServiceDTO) => {
      setServiceToModifyId(service.id.toString());
      handleDeleteConfirmationModalOpen();
    },
    [handleDeleteConfirmationModalOpen]
  );

  const handleServiceCreateSubmit = useCallback(
    (payload: ServiceCreateRequestDTO) => {
      void dispatch(serviceActions.create(payload));
    },
    [dispatch]
  );

  const handleServiceEditSubmit = useCallback(
    (payload: ServiceCreateRequestDTO) => {
      if (serviceToModifyId) {
        void dispatch(
          serviceActions.update({ id: serviceToModifyId, data: payload })
        );
        setServiceToModifyId(null);
      }
    },
    [dispatch, serviceToModifyId]
  );

  const handleServiceDeleteConfirm = useCallback(() => {
    if (serviceToModifyId) {
      void dispatch(serviceActions.deleteById(serviceToModifyId));
    }
  }, [dispatch, serviceToModifyId]);

  const isLoading =
    status === DataStatus.IDLE ||
    (status === DataStatus.PENDING && !hasServices);

  const isUpdateFormShown = service && serviceStatus === DataStatus.SUCCESS;

  return (
    <PageLayout isBigMargin>
      <header className={styles['services-header']}>
        <h1 className={styles['title']}>My Services</h1>
        <div>
          <Button label="Create New Service" onClick={handleCreateModalOpen} />
        </div>
      </header>
      <ServiceSearch
        control={control}
        errors={errors}
        name="search"
        onChange={handleSearchChange}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles['services-list']}>
          {hasServices ? (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                onDelete={handleDeleteClick}
                onEdit={handleEditClick}
                service={service}
              />
            ))
          ) : (
            <p className={styles['empty-placeholder']}>
              {emptyPlaceholderMessage}
            </p>
          )}
        </div>
      )}
      <Modal
        isOpened={isCreateModalOpen}
        onClose={handleCreateModalClose}
        title="Create new service"
      >
        <ServiceCreateForm onSubmit={handleServiceCreateSubmit} />
      </Modal>
      <Modal
        isOpened={isEditModalOpen}
        onClose={handleEditModalClose}
        title="Update service"
      >
        {isUpdateFormShown && (
          <ServiceUpdateForm
            onSubmit={handleServiceEditSubmit}
            service={service}
          />
        )}
      </Modal>
      <ConfirmationModal
        content="The service will be deleted. This action cannot be undone. Click 'Confirm' to proceed."
        isOpened={isDeleteConfirmationModalOpen}
        onClose={handleDeleteConfirmationModalClose}
        onConfirm={handleServiceDeleteConfirm}
      />
    </PageLayout>
  );
};

export { MyServices };

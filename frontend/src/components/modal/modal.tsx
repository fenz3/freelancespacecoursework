import { useHandleClickOutside } from '~/hooks/hooks';
import styles from './styles.module.css';
import { useRef } from 'react';
import { IconButton } from '../components';

type Properties = {
  children: React.ReactNode;
  isOpened: boolean;
  onClose: () => void;
  title: string;
};

const Modal = ({
  children,
  isOpened,
  onClose,
  title,
}: Properties): JSX.Element => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useHandleClickOutside(dialogReference, onClose);

  if (!isOpened) {
    return <></>;
  }

  return (
    <>
      <div className={styles['modal-backdrop']} />

      <dialog
        aria-label={title}
        className={styles['modal-container']}
        ref={dialogReference}
      >
        <div className={styles['modal-content']}>
          <div className={styles['modal-close']}>
            <IconButton iconName="cross" label="Close" onClick={onClose} />
          </div>
          <div className={styles['modal-body']}>
            <h3 className={styles['modal-header-title']}>{title}</h3>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
};

export { Modal };

import styles from './styles.module.css';

const Loader = (): JSX.Element => (
  <div className={styles['loader-wrapper']}>
    <div className={styles['spinner']} aria-label="Loading" role="status" />
  </div>
);

export { Loader };

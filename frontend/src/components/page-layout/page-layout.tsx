import { Loader } from '../components';
import styles from './styles.module.css';

type Properties = {
  children: React.ReactNode;
  isLoading?: boolean;
  isBigMargin?: boolean;
};

const PageLayout = ({
  children,
  isLoading = false,
  isBigMargin = false,
}: Properties): JSX.Element => {
  return (
    <div className={styles['page']}>
      <div className={styles['page-body']}>
        <main
          className={
            isBigMargin
              ? styles['page-content-bigMargin']
              : styles['page-content']
          }
        >
          {isLoading ? <Loader /> : <>{children}</>}
        </main>
      </div>
    </div>
  );
};

export { PageLayout };

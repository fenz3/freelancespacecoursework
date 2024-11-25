import { Button } from '~/components/components';
import styles from './styles.module.css';
import { AppPath } from '~/common/enums/enums';

const NotFound = (): JSX.Element => {
  return (
    <main className={styles['container']}>
      <span className={styles['decoration']}>404</span>
      <h1 className={styles['title']}>Something went wrong</h1>
      <p className={styles['text']}>
        Sorry, we can’t find the page you’re looking for.
      </p>
      <div>
        <Button href={AppPath.ROOT} label="Back to home" />
      </div>
    </main>
  );
};

export { NotFound };

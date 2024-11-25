import { ServicesSearch } from './components/services-search/services-search';
import styles from './styles.module.css';

const Main = (): JSX.Element => {
  return (
    <main className={styles['container']}>
      <section className={styles['hero']}>
        <h1 className={styles['hero-title']}>
          Unlock the power of knowledge and <br /> expertise.
        </h1>
        <ServicesSearch
          isLabelHidden
          label="search"
          placeholder="Search for service"
        />
        <h3 className={styles['hero-subtitle']}>
          Find the best services in one place.
        </h3>
      </section>
    </main>
  );
};

export { Main };

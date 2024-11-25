import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '~/components/header/header';
import styles from './styles.module.css';

const Layout: React.FC = () => (
  <>
    <div className={styles['page-header']}>
      <Header />
    </div>
    <>
      <Outlet />
    </>
    {/* <Footer /> */}
  </>
);

export default Layout;

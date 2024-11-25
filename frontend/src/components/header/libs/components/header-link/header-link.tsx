import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

type Properties = {
  label: string;
  link: string;
};

const HeaderLink: React.FC<Properties> = ({ label, link }) => {
  return (
    <NavLink className={styles['header-link']} to={link}>
      {label}
    </NavLink>
  );
};

export { HeaderLink };

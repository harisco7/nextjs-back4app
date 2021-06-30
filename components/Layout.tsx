import React, { ReactNode } from 'react';
import styles from './Layout.module.scss';
import Link from 'next/link';
export interface BaseProps {
  children?: ReactNode;
  title?: string;
}

export const Layout = ({ children }: BaseProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <header>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
        <Link href="/profile">
          <a>Profile</a>
        </Link>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;

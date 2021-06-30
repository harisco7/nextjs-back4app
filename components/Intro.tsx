import { useTranslation } from 'next-i18next';
import styles from './Intro.module.scss';

const Intro = (): JSX.Element => {
  const { t } = useTranslation('common');

  return (
    <>
      <img className={styles.img} src="/nextjs.svg" />
      <img className={styles.img} src="/back4app.png" />
      <h2 className={styles.h2}>{t('description')}</h2>
    </>
  );
};

export default Intro;

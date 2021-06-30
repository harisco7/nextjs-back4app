import styles from './Card.module.scss';
import { BaseProps } from './Layout';

const Card = ({ children }: BaseProps): JSX.Element => {
  return <div className={styles.root}>{children}</div>;
};

export default Card;

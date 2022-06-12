import styles from './description.module.scss';

export default function Description({ title }: TitleProps) {
  return <p className={styles.description}>{title}</p>;
}

interface TitleProps {
  title: string;
}

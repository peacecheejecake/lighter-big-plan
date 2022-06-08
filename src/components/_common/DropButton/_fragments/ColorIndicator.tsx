import styles from '../dropButton.module.scss';

export default function ColorIndicator({ color }: ColorInidicatorProps) {
  return <div className={styles.colorIndicator} style={{ backgroundColor: color }} />;
}

interface ColorInidicatorProps {
  color: string;
}

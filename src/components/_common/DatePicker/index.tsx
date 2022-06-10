import cx from 'classnames';
import type { FunctionComponent, SVGProps, MouseEvent } from 'react';

import { useClickOuter } from 'hooks/useClickOuter';
import { useRecoilValue } from 'recoil';
import { darkModeState } from 'store/states/themeState';
import Calendar from './_components/Calendar';
import styles from './datePicker.module.scss';

export default function DatePicker({ Icon, title = '', className }: DatePickerProps) {
  const [isOpen, setIsOpen, containerRef] = useClickOuter<HTMLDivElement>();
  const darkMode = useRecoilValue(darkModeState);

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prev) => !prev);
  };

  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <div className={cx(styles.datePicker, themeClassName)} ref={containerRef}>
      <button type="button" className={styles.button} onClick={handleClickButton}>
        {Icon && <Icon className={cx(styles.icon, { [styles.iconOpen]: isOpen })} />}
        {title && <span className={cx(styles.title, { [styles.titleOpen]: isOpen })}>{title}</span>}
      </button>
      {isOpen && <Calendar setIsOpen={setIsOpen} className={className} />}
    </div>
  );
}

interface DatePickerProps {
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  title?: string;
  className?: string;
}

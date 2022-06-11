import cx from 'classnames';
import type { FunctionComponent, SVGProps } from 'react';

import { useClickOuter } from 'hooks/useClickOuter';
import { useRecoilValue } from 'recoil';
import { darkModeState } from 'store/states/themeState';
import { CloseIcon } from 'assets/svgs';
import { useEditingItem } from 'components/TodoBoard/_hooks/useEditingItem';
import Calendar from './_components/Calendar';
import styles from './datePicker.module.scss';

export default function DatePicker({ Icon, title = '', className }: DatePickerProps) {
  const darkMode = useRecoilValue(darkModeState);
  const [isOpen, setIsOpen, containerRef] = useClickOuter<HTMLDivElement>();
  const [, setItem] = useEditingItem();

  const handleClickPickerButton = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickCancelButton = () => {
    setItem((prev) => ({
      ...prev,
      start: undefined,
      end: undefined,
    }));
  };

  const themeClassName = darkMode ? styles.darkMode : styles.lightMode;

  return (
    <div className={cx(styles.datePicker, themeClassName)} ref={containerRef}>
      {title && (
        <button type="button" className={styles.cancelButton} onClick={handleClickCancelButton}>
          <CloseIcon />
        </button>
      )}
      <button type="button" className={styles.pickerButton} onClick={handleClickPickerButton}>
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

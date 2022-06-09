import cx from 'classnames';
import { FunctionComponent, SVGProps } from 'react';

import { useClickOuter } from 'hooks/useClickOuter';
import Calendar from './_components/Calendar';
import styles from './datePicker.module.scss';

export default function DatePicker({ Icon, title = '', className }: DatePickerProps) {
  const [isOpen, setIsOpen, containerRef] = useClickOuter<HTMLDivElement>();

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.datePicker} ref={containerRef}>
      <button type="button" className={cx(styles.button, className)} onClick={handleClickButton}>
        {Icon && <Icon className={styles.icon} />}
        {title && <span className={styles.title}>{title}</span>}
      </button>
      {isOpen && <Calendar setIsOpen={setIsOpen} />}
    </div>
  );
}

interface DatePickerProps {
  Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
  title?: string;
  className?: string;
}

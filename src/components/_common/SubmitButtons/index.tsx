import { useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react';

import { ArrowBackIcon, CheckIcon } from 'assets/svgs';
import styles from './submitButtons.module.scss';

export default function SubmitButtons() {
  const navigate = useNavigate();

  const handleClickBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate('..', { replace: true });
  };

  return (
    <div className={styles.submitButtons}>
      <button type="button" onClick={handleClickBack} className={styles.back}>
        <ArrowBackIcon />
      </button>
      <button type="submit" className={styles.submit}>
        <CheckIcon />
      </button>
    </div>
  );
}

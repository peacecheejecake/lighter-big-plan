import { CategoryIcon } from 'assets/svgs';
import { useClickOuter } from 'hooks/useClickOuter';
import CategoryMenu from '../../CategoryMenu';
import styles from '../itemOptionBar.module.scss';

export default function CategoryButton() {
  const [isOpen, setIsOpen, continerRef] = useClickOuter<HTMLButtonElement>();

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button type="button" className={styles.category} onClick={handleClickButton} ref={continerRef}>
      <CategoryIcon />
      {isOpen && <CategoryMenu setIsOpen={setIsOpen} />}
    </button>
  );
}

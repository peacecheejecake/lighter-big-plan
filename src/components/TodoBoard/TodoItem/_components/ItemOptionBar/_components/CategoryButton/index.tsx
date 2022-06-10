import { CategoryIcon } from 'assets/svgs';
import { useClickOuter } from 'hooks/useClickOuter';
import CategoryMenu from './CategoryMenu';
import styles from './categoryButton.module.scss';

export default function CategoryButton() {
  const [isOpen, setIsOpen, continerRef] = useClickOuter<HTMLDivElement>();

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={continerRef}>
      <button type="button" className={styles.category} onClick={handleClickButton}>
        <CategoryIcon className={isOpen ? styles.iconOpen : undefined} />
      </button>
      {isOpen && <CategoryMenu setIsOpen={setIsOpen} />}
    </div>
  );
}

import styles from "./BurgerIngredientsBlock.module.css"
import BurgerIngredientsItem from "../burgerIngredientsItem/BurgerIngredientsItem";
import { forwardRef } from 'react'; // Изменено на forwardRef
import { TIngredient } from "../../utils/types"

interface IBurgerIngredientsBlockProps {
  items: TIngredient[];
  title: string;
  type: string;
}

// Переписываем компонент с использованием forwardRef
const BurgerIngredientsBlock = forwardRef<HTMLDivElement, IBurgerIngredientsBlockProps>(
  ({ items, title, type }, ref) => {
    const filteredItems = items.filter((item) => item.type === type);

    return (
      <div className={styles.chapter} ref={ref}> {/* Привязываем переданный реф */}
        <h3>{title}</h3>
        <div className={styles.chapterBody}>
          {filteredItems.map((ingredient) => (
            <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} />
          ))}
        </div>
      </div>
    );
  }
);

// Задаем displayName, чтобы React DevTools корректно отображал имя компонента
BurgerIngredientsBlock.displayName = "BurgerIngredientsBlock";

export default BurgerIngredientsBlock;

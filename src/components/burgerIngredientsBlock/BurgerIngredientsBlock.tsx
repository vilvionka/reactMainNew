import styles from "./BurgerIngredientsBlock.module.css"
import BurgerIngredientsItem from "../burgerIngredientsItem/BurgerIngredientsItem";
import { FC } from 'react';
import { TIngredient } from "../../utils/types"

interface IBurgerIngredientsBlockProps {
  items: TIngredient[];
  title: string;
  type: string;
}


const BurgerIngredientsBlock: FC<IBurgerIngredientsBlockProps> = ({ items, title, type}) => {

  const filteredItems = items.filter((item) => item.type === type);
  return (
    <div className={styles.chapter}>
      <h3>{title}</h3>
      <div className={styles.chapterBody}>
        {filteredItems.map((ingredient) => (
          <BurgerIngredientsItem key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
    </div>
  )
}



export default BurgerIngredientsBlock
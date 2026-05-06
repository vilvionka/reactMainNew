import styles from "./BurgerIngredients.module.css"
import BurgerIngredientsBlock from "../burgerIngredientsBlock/BurgerIngredientsBlock"
import { useAppSelector } from "../../services/hooks";
import { FC } from 'react';


const CATEGORIES = [
  { id: 1, name: 'Булки', type: 'bun' },
  { id: 2, name: 'Соусы', type: 'sauce' },
  { id: 3, name: 'Начинки', type: 'main' },
];


const  BurgerIngredients: FC = () => {

  const { data, error, isLoading } = useAppSelector((state) => state.ingredients)

 


  return (

    <>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && error && <div>Упс ошибочка...</div>}
      {!isLoading && !error && data.length > 0 &&
        <div className={styles.item}>
          <h2 className={styles.tittle}>Соберите бургер</h2>
          <div className={styles.tab}>
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className={`${styles.tabItem} ${cat.type === 'bun' ? styles.active : ''}`}>
                {cat.name}
              </div>
            ))}
          </div>
          <div className={styles.scrollBox}>
            {CATEGORIES.map((cat) => (
              <BurgerIngredientsBlock
                key={cat.id}
                items={data}
                title={cat.name}
                type={cat.type} />
            ))}
          </div>
        </div>
      }
    </>
  )
}




export default BurgerIngredients
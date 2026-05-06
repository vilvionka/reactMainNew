import styles from "./Body.module.css"
import BurgerConstructor from "../burgerConstructor/BurgerConstructor"
import BurgerIngredients from "../burgerIngredients/BurgerIngredients"
import { FC, useEffect } from 'react';


const Body: FC = () => {

  
  return (
    <div className={styles.content}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  )
}



export default Body

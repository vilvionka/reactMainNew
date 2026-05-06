import styles from "./IngredientDetails.module.css"
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { FC } from 'react';


const IngredientDetails:FC = () => {

  const { id } = useParams();
  const { data } = useAppSelector((state) => state.ingredients);
  const ingredient = data.find((item) => item._id === id);

  if (!ingredient) return null;
  return (
    <div>
      <img className={styles.image} src={ingredient.image_large} alt="icon" />
      <div className={styles.name}>{ingredient.name}</div>
      <div className={styles.box}>
        <div className={styles.item}>
          <span>Калории,ккал</span>
          <span>{ingredient.calories}</span>
        </div>
        <div className={styles.item}>
          <span>Белки, г</span>
          <span>{ingredient.proteins}</span>
        </div>
        <div className={styles.item}>
          <span>Жиры, г</span>
          <span>{ingredient.fat}</span>
        </div>
        <div className={styles.item}>
          <span>Углеводы, г</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}




export default IngredientDetails
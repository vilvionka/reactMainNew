import styles from "./BurgerIngredientsItem.module.css"
import { useDrag } from "react-dnd";
import briliant from "../../image/briliant.svg"
import { useLocation, useNavigate } from "react-router-dom";
import { FC } from 'react';
import { TIngredient } from "../../utils/types"

interface IBurgerIngredientsItemProps {
  ingredient: TIngredient;
}

const BurgerIngredientsItem: FC<IBurgerIngredientsItemProps> = ({ ingredient }) => {

  const { image, name, price, _id } = ingredient;
  const location = useLocation();
  const navigate = useNavigate();

  const [{ isDragging }, dragRef] = useDrag<TIngredient, unknown, { isDragging: boolean }>({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  })

  const handleClick = () => {
    navigate(`/ingredient/${_id}`, { state: { background: location } })
  }


  const opacity = isDragging ? 0.4 : 1;

  return (
    <div className={styles.chapterElem} style={{ opacity }} onClick={handleClick} ref={dragRef}>
      <img src={image} alt={name} />
      <div className={styles.price}>
        <span>{price}</span>
        <img src={briliant} alt="briliant" />
      </div>
      <p>{name}</p>
    </div>
  )
}



export default BurgerIngredientsItem
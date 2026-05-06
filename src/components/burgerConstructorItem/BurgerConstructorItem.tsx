import styles from "./BurgerConstructorItem.module.css"
import briliant from "../../image/briliant.svg"
import zamok from "../../image/zamok.svg"
import draga from "../../image/drag.svg"
import { useRef } from "react";
import { useAppDispatch } from "../../services/hooks";
import { useDrop, useDrag } from "react-dnd";
import { moveIngredient } from "../../services/constructorSlice";
import { FC } from 'react';
import {TConstructorIngredient} from "../../services/constructorSlice"

export interface IBurgerConstructorItemsProps {
  item: TConstructorIngredient;
  removeItem: (key: string)=>void;
  index: number;
}
interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const BurgerConstructorItem: FC<IBurgerConstructorItemsProps> = ({ item, removeItem, index })=> {

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [, drop] = useDrop<IDragItem, void, { isHover: boolean }>({
    accept: 'sort_ingredient',
    hover(dragItem: IDragItem, monitor) {
      if (!ref.current) return;
      const dragIndex = dragItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // 3. Где моя мышка?
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return; 
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // 4. Пора ли прыгать? 
      // (проверка, пересекла ли мышка "экватор" соседней карточки)
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      dragItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sort_ingredient',
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  const { name, price, image_mobile } = item;
  return (
    <div ref={ref} className={styles.card} style={{ opacity: isDragging ? 0 : 1 }}>
      <div className={styles.icon}>
        <img src={draga} alt="drag" />
      </div>
      <div className={styles.block}>
        <img src={image_mobile} alt="bun" />
        <p>{name}</p>
        <div className={styles.price}>
          <span>{price}</span>
          <img src={briliant} alt="briliant" />
          <img src={zamok} alt="zamok" onClick={() => removeItem(item.key)} />
        </div>
      </div>
    </div>
  )
}


export default BurgerConstructorItem
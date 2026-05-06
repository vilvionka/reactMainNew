import styles from "./BurgerConstructor.module.css"
import BurgerConstructorItem from "../burgerConstructorItem/BurgerConstructorItem";
import Total from "../total/Total";
import briliant from "../../image/briliant.svg"
import zamok from "../../image/zamok.svg"
import {useAppSelector, useAppDispatch } from "../../services/hooks";
import { useDrop } from "react-dnd";
import { addIngredient, removeIngredient } from "../../services/constructorSlice";
import { useMemo } from "react";
import { postOrder } from "../../services/orderSlice";
import { useNavigate } from "react-router-dom";
import { FC } from 'react';
import { TIngredient } from "../../utils/types";



const BurgerConstructor: FC = () => {

  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector((state) => state.burgerConstructor);
  const {user} = useAppSelector((state)=> state.userStore);
  const navigate = useNavigate();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  })

  const boxShadow = isHover
    ? 'inset 0 0 15px rgba(76, 76, 255, 0.4)' // Мягкое синее свечение внутри
    : 'none';


  const removeItem = (key: string) => {
    dispatch(removeIngredient(key));
  }

  const totalPrice = useMemo(() => {
    const ingredientsPrice = ingredients.reduce((acc, item) => acc + item.price, 0);
    const bunPrice = bun ? bun.price * 2 : 0;
    return ingredientsPrice + bunPrice;
  }, [bun, ingredients])

  const onCreateOrder = ()=>{
    if(!bun) return;
    if(!user ){
      navigate('/login');
      return
    }

    const allIds = [
      bun._id,
      ...ingredients.map((item: TIngredient)=> item._id),
      bun._id,
    ];

    dispatch(postOrder(allIds));
  }

  return (
    <div className={styles.box} style={{ boxShadow, transition: 'box-shadow 0.2s ease-in-out' }} ref={dropTarget}>
      <div className={styles.wrap}>
        {bun ? (
          <div className={styles.itemBun}>
            <img src={bun.image_mobile} alt="bun" />
            <p>{bun.name + '(вверх)'}</p>
            <div className={styles.price}>
              <span>{bun.price}</span>
              <img src={briliant} alt="briliant" />
              <img src={zamok} alt="zamok" />
            </div>
          </div>
        ) : (
          <div className={styles.placeholderBun}>Выберите булку</div>
        )}

        {ingredients.length > 0 ? (
          <div className={styles.block}>
            {
              ingredients.map((item, index) => (
                <BurgerConstructorItem key={item.key} item={item} removeItem={removeItem} index={index} />
              ))
            }
          </div>
        ) : (
          <div className={styles.placeholderMain}>Добавьте начинку</div>
        )}

        {bun && (
          <div className={styles.itemBun}>
            <img src={bun.image_mobile} alt="bun" />
            <p>{bun.name + '(низ)'}</p>
            <div className={styles.price}>
              <span>{bun.price}</span>
              <img src={briliant} alt="briliant" />
              <img src={zamok} alt="zamok" />
            </div>
          </div>
        )}

      </div>
      <Total price={totalPrice} bun={bun} orderOpen={onCreateOrder}/>
    </div>
  )
}




export default BurgerConstructor
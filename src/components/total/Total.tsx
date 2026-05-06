import styles from "./Total.module.css"
import briliant from "../../image/briliant.svg"
import OrderDetals from "../orderDetals/OrderDetals";
import Modal from "../modal/Modal";
import { closeOrderModal } from "../../services/orderSlice";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { FC } from 'react';
import { TIngredient } from "../../utils/types";


interface ITotalProps {
  price: number;
  bun: TIngredient | null ;
  orderOpen: ()=> void;
}


const Total: FC<ITotalProps> = ({price, bun, orderOpen}) => {

  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.orderStore); 

  

  return (
    <div className={styles.box}>
      <div className={styles.number}>
        <span>{price}</span>
        <img src={briliant} alt="briliant" />
      </div>
      <button className={styles.btn}  disabled ={!bun} onClick={orderOpen}>
        Оформить заказ
      </button>
      {isModalOpen && (
        <Modal title="" onClose={() => dispatch(closeOrderModal())}>
          <OrderDetals />
        </Modal>
      )
      }
    </div>
  )
}

export default Total;
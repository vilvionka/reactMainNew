import styles from "./OrderDetals.module.css"
import ok from "../../image/ok.png";
import { useAppSelector } from "../../services/hooks";


function OrderDetals() {
  const {isLoading, orderNumber} = useAppSelector((state)=> state.orderStore)

  if(isLoading){
    return <p className={styles.load}>Загружаем номер заказа...</p>;
    
  }
  return (
    <div className={styles.box}>
      <div className={styles.number}>{orderNumber}</div>
      <p className={styles.title}>идентификатор заказа</p>
      <img src={ok} alt="img" />
      <p className={styles.text}>Ваш заказ начали готовить</p>
      <span className={styles.bot}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

export default OrderDetals;
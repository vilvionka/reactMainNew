import styles from "./../loginPage/LoginPage.module.css"
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { FC } from 'react';
import FeedItem from "../Feed/FeedItem";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/historySlice";
import { ALL_ORDERS_URL } from "../../utils/burger-api";


const HistoryOrders: FC = () => {

  const { orders } = useAppSelector((state) => state.historyStore);

  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));
    
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders_list}>
      <div className={styles.ordersWrap}>
      {orders.map(order => <FeedItem key={order._id} order={order} />)}
      </div>
    </div>
  )
}

export default HistoryOrders
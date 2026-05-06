import styles from "./../loginPage/LoginPage.module.css"
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { FC } from 'react';
import FeedItem from "../Feed/FeedItem";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/historySlice";


const HistoryOrders: FC = () => {

  const { orders } = useAppSelector((state) => state.historyStore);

  const dispatch = useAppDispatch();

  let accessToken = '';
  const accessTokenKey = localStorage.getItem('accessToken');
  if (accessTokenKey) {
    accessToken = accessTokenKey.replace(/^.{7}/, '')
  }

  const urlWebSocket = `wss://norma.nomoreparties.space/orders?accessToken=${accessToken}`;

  useEffect(() => {
    dispatch(connect(urlWebSocket));
    

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.orders_list}>
      {orders.map(order => <FeedItem key={order._id} order={order} />)}
    </div>
  )
}

export default HistoryOrders
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

  const urlWebSocket = `wss://norma.nomoreparties.space/orders?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MWYzM2FjNmQyOTk3MDAxY2FhZDI2ZSIsImlhdCI6MTc3ODA5MzIyMSwiZXhwIjoxNzc4MDk0NDIxfQ.u_k7vaq_3rbNo1GAW2VLkthXTBtSwUi5vnfb0NbVIg8`;

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
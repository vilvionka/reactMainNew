import { useAppDispatch, useAppSelector } from "../../services/hooks";
import styles from "./../Feed/Feed.module.css"
import { FC, useMemo } from 'react';
import FeedItem from "./FeedItem";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/feedSlice";
import { ALL_ORDERS_URL } from "../../utils/burger-api";

const Feed: FC = () => {

  const { orders, total, totalToday } = useAppSelector((state) => state.feedStore);
  const dispatch = useAppDispatch();

  const { numberReady, numberNoready } = useMemo(() => {

    const ready = orders.filter((elem) => elem.status === 'done');
    const pending = orders.filter((elem) => elem.status === 'pending');

    return { numberReady: ready.slice(0, 5), numberNoready: pending.slice(0, 5) };
  }, [orders]);

  useEffect(() => {
    dispatch(connect(ALL_ORDERS_URL));

    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]); // Масси



  if (!orders) return null;
  return (
    <div className={styles.wrap}>
      <h1>Лента заказов</h1>
      <div className={styles.box}>
        <div className={styles.orders}>
          <div className={styles.ordersWrap}>
            {
              orders.map((item) => (
                <FeedItem order={item} key={item._id} />
              ))
            }
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.dataWrap}>
            <div className={styles.ready}>
              <div className={styles.title}>Готовы:</div>
              {numberReady.map(order => (
                <p key={order._id}>{order.number}</p>
              ))}
            </div>
            <div className={styles.noready}>
              <div className={styles.title}>В работе:</div>
              {numberNoready.map(order => (
                <p key={order._id}>{order.number}</p>
              ))}
            </div>
            <div className={styles.total}>
              <p>Выполнено за все время:</p>
              <span>
                {total}
              </span>
            </div>
            <div className={styles.total}>
              <p>Выполнено за сегодня:</p>
              <span>
                {totalToday}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Feed
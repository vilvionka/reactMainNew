import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import styles from "./../Feed/Feed.module.css";
import briliant from "../../image/briliant.svg";



const FeedElemPage: FC = () => {
  const { id } = useParams();
  const { orders } = useAppSelector((state) => state.feedStore);
  const { data } = useAppSelector((state) => state.ingredients);
  const order = orders.find((item) => item.number === Number(id));

  const statusMap: Record<string, string> = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };

  const { orderIngredients, totalPrice } = useMemo(() => {
    if (!order || !data.length) return { orderIngredients: [], totalPrice: 0 };

    const counts: Record<string, number> = {};
    order.ingredients.forEach((id) => {
      counts[id] = (counts[id] || 0) + 1;
    });

    const ingredients = Object.keys(counts).map((id) => {
      const ingredient = data.find((item) => item._id === id);
      return {
        ...ingredient,
        count: counts[id],
      };
    }).filter((item): item is any => !!item._id);

    const total = ingredients.reduce((acc, item) => acc + (item.price * item.count), 0);

    return { orderIngredients: ingredients, totalPrice: total };
  }, [order, data]);

  if (!order) {
    return (<p>Загрузка...</p>)
  }
  return (
    <div className={styles.pageBox}>
      <div className={styles.pageNumber}>#{order?.number}</div>
      <div className={styles.pageName}>{order?.name}</div>
      <div className={styles.pageStatus}> {statusMap[order.status] || order.status}</div>
      <span>Состав:</span>
      <div className={styles.pageWrap}>
        <div className={styles.pageBody}>
          {orderIngredients?.map((item) => (
            <div className={styles.pageItem}>
              <div className={styles.pageItemBox}>
                <div className={styles.pageImage}>
                  <img className={styles.imageItem} src={item.image_mobile} alt={item.name} />
                </div>
                <div className={styles.pageItemName}>
                  {item.name}
                </div>
              </div>
              <div className={styles.pageItemBox}>
                <div className={styles.pageItemPrice}>
                  <div className={styles.pageCount}>{item.count} x</div>
                  <p>{item.price}</p>
                  <img src={briliant} alt="briliant" />
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className={styles.pageTotal}>
        <div className={styles.pageTotalPrice}>
          <p>{totalPrice}</p>
          <img src={briliant} alt="briliant" />
        </div>
      </div>
    </div>
  )
}

export default FeedElemPage;
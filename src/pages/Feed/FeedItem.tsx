import { useAppSelector } from "../../services/hooks";
import styles from "./../Feed/Feed.module.css";
import { useMemo, FC } from 'react';
import { IOrder } from "../../services/feedSlice";
import briliant from "../../image/briliant.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IFeedItemProps {
  order: IOrder;
}

const FeedItem: FC<IFeedItemProps> = ({ order }) => {
  // Вернул просто data, как ты хотел
  const { data } = useAppSelector((state) => state.ingredients);

  const location = useLocation();
  const navigate = useNavigate();

  const { orderIngredients, totalPrice } = useMemo(() => {
    const ingredients = order.ingredients
      .map((id) => data.find((item) => item._id === id))
      .filter((item): item is NonNullable<typeof item> => !!item);

    const price = ingredients.reduce((acc, item) => acc + (item.price || 0), 0);

    return { orderIngredients: ingredients, totalPrice: price };
  }, [order.ingredients, data]);

  const handleClick = () => {
    navigate(`/feed/${order.number}`, { state: { background: location } })
  }

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.number}>#{order.number}</div>
      <div className={styles.name}>{order.name}</div>
      <div className={styles.flex}>
        <div className={styles.image}>
          {orderIngredients.slice(0, 6).map((elem, index) => (
            <div className={styles.imageBox}>
              <div className={styles.imageWrapper} key={index} style={{ zIndex: 10 - index }}>
                <img className={styles.imageItem} src={elem.image_mobile} alt={elem.name} />
              </div>
              {index === 5 && orderIngredients.length > 6 && (
                <span className={styles.more}>
                  {`+${orderIngredients.length - 5}`}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.price}>
          <span>
            {totalPrice}
          </span>
          <img src={briliant} alt="briliant" />
        </div>
      </div>
    </div>
  );
};

export default FeedItem;

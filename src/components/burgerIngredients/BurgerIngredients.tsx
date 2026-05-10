import styles from "./BurgerIngredients.module.css"
import BurgerIngredientsBlock from "../burgerIngredientsBlock/BurgerIngredientsBlock"
import { useAppSelector } from "../../services/hooks";
import { FC, useState, useRef, UIEvent } from 'react';


const CATEGORIES = [
  { id: 1, name: 'Булки', type: 'bun' },
  { id: 2, name: 'Соусы', type: 'sauce' },
  { id: 3, name: 'Начинки', type: 'main' },
];


const BurgerIngredients: FC = () => {

  const { data, error, isLoading } = useAppSelector((state) => state.ingredients)

  const [current, setCurrent] = useState<string>('bun');
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Маппинг для удобного поиска нужного рефа
  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    bun: bunRef,
    sauce: sauceRef,
    main: mainRef,
  };

  // Метод плавного скролла по клику на таб
  const onTabClick = (type: string) => {
    setCurrent(type);
    const element = refs[type].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Метод отслеживания скролла контейнера
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const containerTop = e.currentTarget.getBoundingClientRect().top;

    const bunTop = bunRef.current ? Math.abs(bunRef.current.getBoundingClientRect().top - containerTop) : Infinity;
    const sauceTop = sauceRef.current ? Math.abs(sauceRef.current.getBoundingClientRect().top - containerTop) : Infinity;
    const mainTop = mainRef.current ? Math.abs(mainRef.current.getBoundingClientRect().top - containerTop) : Infinity;

    // Ищем, какой блок ближе всего к верхней границе контейнера
    if (bunTop < sauceTop && bunTop < mainTop) {
      setCurrent('bun');
    } else if (sauceTop < bunTop && sauceTop < mainTop) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  return (

    <>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && error && <div>Упс ошибочка...</div>}
      {!isLoading && !error && data.length > 0 &&
        <div className={styles.item}>
          <h2 className={styles.tittle}>Соберите бургер</h2>
          <div className={styles.tab}>
            {CATEGORIES.map((cat) => (
              <div key={cat.id} onClick={() => onTabClick(cat.type)} className={`${styles.tabItem} ${cat.type === current ? styles.active : ''}`}>
                {cat.name}
              </div>
            ))}
          </div>
          <div className={styles.scrollBox} onScroll={handleScroll}>
            {CATEGORIES.map((cat) => (
              <BurgerIngredientsBlock
                key={cat.id}
                items={data}
                title={cat.name}
                type={cat.type}
                ref={refs[cat.type] as React.Ref<HTMLDivElement>} />
            ))}
          </div>
        </div>
      }
    </>
  )
}




export default BurgerIngredients
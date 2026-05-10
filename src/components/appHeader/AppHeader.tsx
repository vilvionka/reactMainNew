import styles from './AppHeader.module.css'
import burger from '../../image/burger.svg'
import lenta from '../../image/lenta.svg'
import logo from '../../image/logo.png'
import avatar from '../../image/avatar.svg'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { FC } from 'react';


const AppHeader: FC = () => {

  const navigate = useNavigate();
  const linkMain = () => {
    navigate('/');
  }

  return (
    <header>
      <div className={styles.headerGreed}>
        <div className={styles.headerLeft}>
          <div className={styles.headerItem} onClick={linkMain}>
            <img src={burger} alt="burger" />
            <span>Конструктор</span>
          </div>
          <div className={styles.headerItem}>
            <img src={lenta} alt="lenta" />
            <Link to='feed'><span>Лента заказов</span></Link>
          </div>
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="img" />
        </div>
        <div className={styles.headerItem}>
          <img src={avatar} alt="avatar" />
          <Link to='/profile'><span>Личный кабинет</span></Link>
        </div>
      </div>
    </header>
  )
}


export default AppHeader
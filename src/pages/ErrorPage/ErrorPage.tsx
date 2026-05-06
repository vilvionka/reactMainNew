import { Link } from "react-router-dom"
import styles from "./../loginPage/LoginPage.module.css"
import { FC } from 'react';


const ErrorPage: FC = () => {

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <div className={styles.error}>404</div>
        <div className={styles.danger}>Такой странице не существует.</div>
        <div className={styles.add}>
          <p>Перейдите на страницу</p> 
          <Link to="/">Главная</Link>
        </div>
      </div>

    </div>
  )
}

export default ErrorPage
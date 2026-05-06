import { Link, useNavigate } from "react-router-dom"
import styles from "./../loginPage/LoginPage.module.css"
import { forgotApi } from "../../utils/burger-api";
import { useState,  ChangeEvent, FormEvent } from "react";
import { FC } from 'react';


const ForgotPage:FC = () => {

  const [form, setForm] = useState('');
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form) {
      forgotApi({ email: form })
      .then((res) => {
        if (res.success) {
          navigate('/reset-password', { state: { from: '/forgot-password' } });
        }
      })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <h2>Восстановление пароля</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" className={styles.inp} placeholder="Укажите e-mail" onChange={onChange} value={form} />
          <input type="submit" className={styles.submit} value='Восстановить' />
        </form>
        <div className={styles.add}>
          <p>Вспомнили пароль?</p>
          <Link to="/login">Войти</Link>
        </div>
      </div>

    </div>
  )
}

export default ForgotPage
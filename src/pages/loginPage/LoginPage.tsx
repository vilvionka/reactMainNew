import { Link } from "react-router-dom"
import styles from "./LoginPage.module.css"
import { useAppDispatch } from "../../services/hooks";
import { useState,  ChangeEvent, FormEvent } from "react";
import { login } from "../../services/userSlice";
import { FC } from 'react';


const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(form))
  }

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className={styles.inp} placeholder="E-mail" name="email" onChange={onChange} value={form.email}/>
          <input type="text" className={styles.inp} placeholder="Пароль" name="password" onChange={onChange} value={form.password} />
          <input type="submit" className={styles.submit} value='Войти' />
          <div className={styles.add}>
            <p>Вы — новый пользователь?</p>
            <Link to="/register">Зарегистрироваться</Link>
          </div>
        </form>
        <div className={styles.add}>
          <p>Забыли пароль?</p>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </div>
      </div>

    </div>
  )
}

export default LoginPage
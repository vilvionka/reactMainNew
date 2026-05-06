import { Link } from "react-router-dom"
import styles from "./../loginPage/LoginPage.module.css"
import { useAppDispatch } from "../../services/hooks";
import { useState, ChangeEvent, FormEvent } from "react";
import { register } from "../../services/userSlice";
import { FC } from 'react';


const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    dispatch(register(form));
  }

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <h2>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className={styles.inp} placeholder="Имя" value={form.name} onChange={onChange} name="name" />
          <input type="text" className={styles.inp} placeholder="E-mail" value={form.email} onChange={onChange} name="email" />
          <input type="text" className={styles.inp} placeholder="Пароль" value={form.password} onChange={onChange} name="password" />
          <input type="submit" className={styles.submit} value='Зарегистрироваться' />
          <div className={styles.add}>
            <p>Уже зарегистрированы?</p>
            <Link to="/login">Войти</Link>
          </div>
        </form>
      </div>

    </div>
  )
}

export default RegisterPage
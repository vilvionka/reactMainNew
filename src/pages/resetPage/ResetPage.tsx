import { Link, Navigate, useNavigate } from "react-router-dom"
import styles from "./../loginPage/LoginPage.module.css"
import { useLocation } from "react-router-dom";
import { resetApi } from "../../utils/burger-api";
import { useState, ChangeEvent, FormEvent } from "react";
import { FC } from 'react';


const ResetPage: FC = () => {

  const location = useLocation();
  const [form, setForm]= useState({password: '', token: ''})
  const navigate = useNavigate();

  if(location.state?.from !== '/forgot-password'){
   return  <Navigate to='/forgot-password' />
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(form){
      resetApi({password:form.password, token:form.token})
      .then((res)=>{
        if(res.success){
           navigate('/');
        }
      })
      .catch(err => console.log(err));
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>)=>{

    const {name, value} = e.target
    setForm({...form, [name]: value})
  }

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <h2>Восстановление пароля</h2>
        <form onSubmit={handleSubmit}>
          <input type="password" name="password" className={styles.inp} placeholder="Введите новый пароль" value={form.password} onChange={onChange}/>
          <input type="text" name="token" className={styles.inp} placeholder="Введите код из письма" value={form.token} onChange={onChange}/>
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

export default ResetPage
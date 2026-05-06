import styles from "./../loginPage/LoginPage.module.css"
import { logout } from "../../services/userSlice"
import { useAppSelector, useAppDispatch } from "../../services/hooks";
import { FC } from 'react';
import { Outlet, NavLink } from 'react-router-dom';


const ProfilePage: FC = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userStore.user)

  const exitProfile = () => {
    dispatch(logout());
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.discription}>
        <NavLink to="/profile" end><span>Профиль</span></NavLink>
        <NavLink to="/profile/history"><span>История заказов</span></NavLink>
        <div className={styles.exit} onClick={exitProfile}>Выход</div>
        <p>В этом разделе вы можете
          изменить&nbsp;свои персональные данные</p>
      </div>
      <Outlet />

    </div>
  )
}

export default ProfilePage
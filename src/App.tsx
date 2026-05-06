import AppHeader from "./components/appHeader/AppHeader";
import Body from "./components/body/Body";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './services/hooks';
import { fetchIngredients } from './services/ingredientsSlice';
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ForgotPage from "./pages/forgot/ForgotPage";
import ResetPage from "./pages/resetPage/ResetPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { checkUserAuth } from "./services/userSlice";
import { useLocation } from "react-router-dom";
import IngredientDetails from "./components/ingredientDetails/IngredientDetails";
import Modal from "./components/modal/Modal";
import IngredientPage from "./pages/IngredientPage/IngredientPage";
import { FC, useEffect } from 'react';
import Feed from "./pages/Feed/Feedt";
import FeedElemPage from "./pages/Feed/FeedElemPage";
import FeedId from "./pages/Feed/FeedId";
import HistoryOrders from "./pages/history/HistoryOrders";
import ProfileInputs from "./pages/profile/ProfileInputs";



const App: FC = () => {

  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector((state) => state.ingredients)

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch])



  return (

    <>
      <AppHeader />
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && error && <div>Упс ошибка...</div>}
      <Routes location={background || location}>
        <Route path="/" element={!isLoading && !error ? <Body /> : null} />
        <Route path="/login" element={<ProtectedRoute anonymous={true} element={<LoginPage />} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />}>
          <Route index element={<ProfileInputs />} /> {/* Твои инпуты здесь */}
          <Route path="history" element={<HistoryOrders />} />
        </Route>

        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:id" element={<FeedId />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/ingredient/:id" element={
            <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          } />
          <Route path="/feed/:id" element={
            <Modal title="Детали заказа" onClose={() => navigate(-1)}>
              <FeedElemPage />
            </Modal>
          } />
        </Routes>
      )}
    </>
  );
}

export default App;

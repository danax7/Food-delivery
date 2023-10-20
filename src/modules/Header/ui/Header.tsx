import { Link } from "react-router-dom";
import { HeaderLogo } from "../components/HeaderLogo";
import { LinksList } from "../components/LinksList";
import s from "./Header.module.scss";
import { selectIsAuthenticated } from "@/modules/Auth/Model/slice";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/modules/Auth/Model/thunk";
import { AppDispatch } from "@/store/store";

export const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className={s.header}>
      <HeaderLogo />
      <LinksList />
      {!isAuthenticated && (
        <div>
          <Link to="" className={s.item}>
            Зарегестрироваться
          </Link>
          <Link to={"/login"} className={s.item}>
            Войти
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className={s.userProfile}>
          <span className={s.email}>{localStorage.getItem("email")}</span>
          <button onClick={handleLogout} className={s.logoutButton}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

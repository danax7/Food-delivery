import { Link } from "react-router-dom";
import { HeaderLogo } from "../components/HeaderLogo";
import { LinksList } from "../components/LinksList";
import s from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={s.header}>
      <HeaderLogo />
      <LinksList />
      <Link to="/registration/" className={s.item}>
        Войти
      </Link>
    </div>
  );
};

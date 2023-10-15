import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.png";

import s from "../ui/Header.module.scss";

export const HeaderLogo = () => (
  <Link to={""}>
    <div className={s.logo}>
      <img src={logo} alt="logo" />
      <span>Территория роллов</span>
    </div>
  </Link>
);

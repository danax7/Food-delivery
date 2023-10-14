import { HeaderLogo } from "../components/HeaderLogo";
import { LinksList } from "../components/LinksList";
import s from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={s.header}>
      <HeaderLogo />
      <span>Территория роллов</span>
      <LinksList />
    </div>
  );
};

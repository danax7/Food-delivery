import s from "./Footer.module.scss";
const Footer = () => (
  <footer className={s.footer}>
    <div className={s.container}>
      <span className={s.name}>Территория роллов</span>
      <span>2023</span>
    </div>
  </footer>
);
export default Footer;

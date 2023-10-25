import { Link } from "react-router-dom";
import cartLogo from "@/assets/img/Cart.svg";
import profileLink from "@/assets/img/profileLink.svg";
import orderIcon from "@/assets/img/icon_order.svg";
import s from "../ui/Header.module.scss";
const HeaderLinksIcons = () => {
  return (
    <div className={s.HeaderLinksIcons}>
      <Link to="/profile">
        <img src={profileLink} alt="profile" />
      </Link>
      <Link to="/cart/">
        <img src={cartLogo} alt="cart" />
      </Link>
      <Link to="/orders/">
        <img src={orderIcon} alt="orders" />
      </Link>
    </div>
  );
};

export default HeaderLinksIcons;

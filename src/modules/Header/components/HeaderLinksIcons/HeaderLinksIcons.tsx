import { Link } from "react-router-dom";
import cartLogo from "@/assets/img/Cart.svg";
import profileLink from "@/assets/img/profileLink.svg";
import orderIcon from "@/assets/img/icon_order.svg";
import s from "./HeaderLinksIcons.module.scss";
import { selectCartItems } from "@/modules/UserCart/Model/slice";
import { useSelector } from "react-redux";
const HeaderLinksIcons = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.amount,
    0
  );
  return (
    <div className={s.HeaderLinksIcons}>
      <Link to="/profile">
        <img src={profileLink} alt="profile" />
      </Link>
      <Link to="/cart/" className={s.Cart}>
        <img src={cartLogo} alt="cart" />
        <span className={s.cartCount}>{totalCartItems}</span>
      </Link>
      <Link to="/orders/">
        <img src={orderIcon} alt="orders" />
      </Link>
    </div>
  );
};

export default HeaderLinksIcons;

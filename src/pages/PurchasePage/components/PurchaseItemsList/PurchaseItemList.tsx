import CartItemList from "@/pages/UserCartPage/components/CartItemsList/CartItemsList";

const PurchaseItemList = () => {
  return (
    <div>
      <CartItemList withButton={false} text="Список блюд" />
    </div>
  );
};
export default PurchaseItemList;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  totalPrice: number;
  amount: number;
  image: string;
}

export interface CartState {
  items: CartItem[];
}

export interface DishInfoState {
  dish: IDish | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export interface IDish {
  name: string;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
  rating: number;
  category: string;
  id: string;
}

export interface DishInfoParams {
  dishId: string;
}

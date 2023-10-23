export interface Dish {
  name: string;
  description: string;
  price: number;
  image: string;
  vegetarian: boolean;
  rating: number;
  category: string;
  id: string;
}

export interface MenuState {
  dishes: Dish[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  pagination: {
    size: number;
    count: number;
    current: number;
  };
}

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DishPage from "@/pages/DishPage/ui/DishPage";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage";
import { Header } from "@/modules/Header/ui/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path="" element={<MenuPage />} />
          <Route path="/item/:dishId" element={<DishPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

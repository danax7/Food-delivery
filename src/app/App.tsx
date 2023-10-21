import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import DishPage from "@/pages/DishPage/ui/DishPage";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage";
import { Header } from "@/modules/Header/ui/Header";
import LoginPage from "@/pages/LoginPage/ui/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage/ui/RegistrationPage";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="" element={<MenuPage />} />
          <Route path="/item/:dishId" element={<DishPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/registration/" element={<RegistrationPage />} />
          <Route path="/login/" element={<LoginPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

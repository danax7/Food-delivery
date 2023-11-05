import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
import { Provider, useSelector } from "react-redux";
import { store } from "@/store/store";
import DishPage from "@/pages/DishPage/ui/DishPage";
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage";
import { Header } from "@/modules/Header/ui/Header";
import LoginPage from "@/pages/LoginPage/ui/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage/ui/RegistrationPage";
import OrderPage from "@/pages/OrderPage/ui/OrderPage";
import OrdersPage from "@/pages/OrdersPage/ui/OrdersPage";
import PurchasePage from "@/pages/PurchasePage/ui/PurchasePage";
import UserCartPage from "@/pages/UserCartPage/ui/UserCartPage";
import PrivateRoute from "./PrivateRouter";
import Footer from "@/shared/components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />

        <Routes>
          <Route path="" element={<MenuPage />} />
          <Route path="/item/:dishId" element={<DishPage />} />
          <Route path="/registration/" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                {" "}
                <ProfilePage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                {" "}
                <OrdersPage />{" "}
              </PrivateRoute>
            }
          />

          <Route
            path="/order/:orderId"
            element={
              <PrivateRoute>
                {" "}
                <OrderPage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <PrivateRoute>
                {" "}
                <PurchasePage />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/cart/"
            element={
              <PrivateRoute>
                {" "}
                <UserCartPage />{" "}
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Header from "@/modules/Header/ui/Header";
import DishPage from "@/pages/DishPage/ui/DishPage";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="" element={<MenuPage />} />
          <Route path="/item/:dishId" element={<DishPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

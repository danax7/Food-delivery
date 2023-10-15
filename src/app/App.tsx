import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="" element={<MenuPage />} />
          {/* <Route path="/films/:filmId" element={<FilmPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

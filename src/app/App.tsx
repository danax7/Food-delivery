import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MenuPage } from "@/pages/MenuPage/ui/MenuPage";
// import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      {/* <Provider store={}> */}

      <Routes>
        <Route path="" element={<MenuPage />} />
        {/* <Route path="/films/:filmId" element={<FilmPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} /> */}
      </Routes>

      {/* </Provider> */}
    </BrowserRouter>
  );
}

export default App;

import "./styles/load-fonts";
import "./styles/global.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MainPage } from "./pages/MainPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

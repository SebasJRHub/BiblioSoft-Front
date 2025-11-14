import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import BuscarPorCodigo from "./pages/BuscarPorCodigo/BuscarPorCodigo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/buscarCod" element={<BuscarPorCodigo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

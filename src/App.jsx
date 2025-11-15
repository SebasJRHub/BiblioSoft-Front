import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

import ChangePassword from "./pages/ChangePassword/ChangePassword";
import BuscarPorCodigo from "./pages/BuscarPorCodigo/BuscarPorCodigo";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import Buscar from "./pages/Buscar/Buscar";
import Register from "./pages/Register/Register";
import Forgot from "./pages/ForgotPassword/Forgot.jsx";
import Reset from "./pages/ResetPassword/Reset.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search-user" element={<BuscarPorCodigo />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-user" element={<UserDashboard />} />
        <Route path="/buscar" element={<Buscar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;

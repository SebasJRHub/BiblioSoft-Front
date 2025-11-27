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
import FinesPage from "./pages/Fines/FinesPage.jsx";

import Prestamos from "./pages/Prestamos/RegistrarPrestamo.jsx";
import AdminPrestamos from "./pages/Prestamos/AdminPrestamos.jsx";

import AddBook from "./pages/AddBook/AddBook.jsx";
import MisPrestamos from "./pages/MisPrestamos/MisPrestamos.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search-user" element={<BuscarPorCodigo />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-user" element={<UserDashboard />} />
        <Route path="/search-book" element={<Buscar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-prestamos" element={<MisPrestamos />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/registrar-prestamo" element={<Prestamos />} />
        <Route path="/loans" element={<AdminPrestamos />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/fines" element={<FinesPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

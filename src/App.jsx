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
import ProtectedRoute from "./utils/ProtectedRoute.jsx";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        

        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/fines" element={<FinesPage />} />
        

        <Route path="/registrar-prestamo" element={<ProtectedRoute><Prestamos /></ProtectedRoute>} />
        <Route path="/loans" element={<ProtectedRoute><AdminPrestamos/></ProtectedRoute>} />
        <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/search-user" element={<ProtectedRoute><BuscarPorCodigo /></ProtectedRoute>} />
        <Route path="/dashboard-admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/dashboard-user" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/search-book" element={<ProtectedRoute><Buscar /></ProtectedRoute>} />
        <Route path="/mis-prestamos" element={<ProtectedRoute><MisPrestamos /></ProtectedRoute>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;

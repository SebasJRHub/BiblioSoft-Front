import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import BuscarPorCodigo from "./pages/BuscarPorCodigo/BuscarPorCodigo";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/search-user" element={<BuscarPorCodigo />} />
       <Route path="/dashboard-admin" element={<AdminDashboard />} />
       <Route path="/dashboard-user" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

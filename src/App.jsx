import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Forgot from "./pages/ForgotPassword/Forgot.jsx";
import Reset from "./pages/ResetPassword/Reset.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import LibroForm from "./components/LibroForm";
import LibroList from "./components/LibroList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Buscar from "./pages/Buscar/Buscar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/buscar" element={<Buscar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

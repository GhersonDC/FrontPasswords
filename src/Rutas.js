import "antd/dist/antd.less";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Login}  from "./pages/Login";
import { Formulario } from "./pages/Formulario";

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/menu" element={<Formulario/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;

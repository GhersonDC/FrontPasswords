import "antd/dist/antd.less";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login }  from "./pages/Login";
import { Register } from "./pages/Register";
import Menu from "./pages/MenuPage";
import  Error  from "./pages/Error";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();

function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Register" element={<Register/>}/>
        <Route exact path="/menu" element={<Menu/>}/*element={cookies.get('clientid') ? (<Formulario />):( <Navigate to="/" />)}*//>
        <Route path="*"  element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Rutas;

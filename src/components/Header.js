import React from 'react';
import {
    Button,
    Layout,
  } from "antd";

  import { LogoutOutlined } from "@ant-design/icons";
  import Cookies from "universal-cookie";
  const { Header } = Layout;
  const cookies = new Cookies();
  
  const array = ["nombre", "token", "clientid", "address", "rfc", "telefono", "email"];

  const cerrarSesion = () => {
    for (let i = 0; i < array.length; i++) {
      cookies.remove(array[i], {secure: true, sameSite: 'none'});
    }
    localStorage.removeItem('token');
    window.location.href = "/";
  };
export const Headers = () => {
  return (
    <Header>
        <h2 className="form-menu-name-client">{cookies.get("nombre")}</h2>
        <Button
          style={{ position: "absolute", right: 15, top: 15 }}
          type="primary"
          icon={<LogoutOutlined />}
          onClick={cerrarSesion}
        >
          Log out
        </Button>
      </Header>
  )
}

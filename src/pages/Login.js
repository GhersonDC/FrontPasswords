import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import Cookies from "universal-cookie";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../images/favicon.ico'

const cookies = new Cookies();
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";
export const Login = () => {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const url = `${API_HOST}/api/login?email=${inputs.email}&password=${inputs.password}`;
  useEffect(() => {
    if (cookies.get("name")) {
      window.location.href = "./menu";
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    const resp = await fetch(url, {
      method: "POST",
    });
    setLoading(false);
    const { data } = await resp.json();
    if (data.nombre) {
      cookies.set("nombre", data.nombre, { path: "/" });
      cookies.set("token", data.token, { path: "/" });
      cookies.set("clientid", data.clientid, { path: "/" });
      cookies.set("rfc", data.rfc, { path: "/" });
      cookies.set("address", data.direccion, { path: "/" });
      cookies.set("telefono", data.telefono, { path: "/" });
      cookies.set('email', inputs.email, { path: "/" });
      window.location.href = "./menu";
    } else {
      message.error("User or password incorrect");
    }
  };

  const onFinishFailed = () => {
    message.error('Try again. Input email and password correctly.');

  };

  const handleInputChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="total-login">
      <div>
        <div className="main_root_logo">
          <img src={logo} alt="icon g-global" />
          <h1>G-Clients</h1>
        </div>
        <h4 className="main_root_text">Welcome Back! <br></br>Please sign in to your Account</h4>
      </div>
      <div className="form-login">
        <Form
          name="G-Client"
          labelAlign="left"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={getData}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The email you entered isn’t connected to an account.",
              },
              {
                required: true,
                message: "Please input your username",
              },
            ]}
          >
            <Input 
            className="input_root"
            name="email" prefix={<UserOutlined className="site-form-item-icon" />} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "The password you’ve entered is incorrect.",
              },
            ]}
          >
            <Input.Password name="password" onChange={handleInputChange} prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button 
            className="boton"
            type="primary" htmlType="submit" loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
      <span class="login-footer-label">Made with <span role="img" aria-label="heart-emoji">❤️</span> by INN</span>
    </div>
  );
};

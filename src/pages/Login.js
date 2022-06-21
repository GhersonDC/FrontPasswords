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
      cookies.set('email',inputs.email,{ path: "/" });
      window.location.href = "./menu";
    } else {
      message.error("User or password incorrect");
    }
  };

  const onFinishFailed = () => {
    message.error('Input Username and password');
    
  };

  const handleInputChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="total-login">
        <div className="text">
            <h1><img src={logo}  alt="icon g-global"/>G-Clients</h1>
            <h4>Welcome Back! Please sign in to your Account</h4>
        </div>
      <div className="form-login">
        <Form
        layout="vertical"
          name="G-Client"
          wrapperCol={{
            span: 18,
          }}
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
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input name="email" prefix={<UserOutlined className="site-form-item-icon" />} onChange={handleInputChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

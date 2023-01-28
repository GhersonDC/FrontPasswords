import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import Cookies from "universal-cookie";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "../images/favicon.ico";
import { Amplify, Auth } from "aws-amplify";

const cookies = new Cookies();
const API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:8000";
export const Login = () => {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  //falta corregir para invocar el dynamo
  //const url = `${API_HOST}/api/login?email=${inputs.email}&password=${inputs.password}`;

  const getData = async function signIn() {
    try {
      //aws amplify
      const user = await Auth.signIn(username, password);
      console.log(user);
      setLoading(false);
      // const { data } = await resp.json();
      // if (data.nombre) {
      //   cookies.set("nombre", data.nombre, { secure: true, sameSite: "none" });
      //   // localStorage.setItem('token',data.token);
      //   localStorage.setItem("nombre", data.nombre);
      //   window.location.href = "./menu";
      // } else {
      //   message.error("User or password incorrect");
      // }
    } catch (error) {
      console.log("error signing in", error);
    }
  };

  const onFinishFailed = () => {
    message.error("Try again. Input email and password correctly.");
  };

  const handleInputChange = (e) => {
    setinputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="total-login">
        <div className="header">
          <div className="main_root_logo">
            <img src={logo} className="logo" />
            <h1> Password System Auth </h1>
          </div>
          <div className="main_root_header_text">
            <p className="main_root_text welcome_msg">Introduce tu password</p>
            <p className="main_root_text sign_in">Selecciona un metodo</p>
          </div>
        </div>
        <div className="main">
          <div className="form-login">
            <Form
              name="PasswordMenu" //here defined info about form name
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
                    message:
                      "The email you entered isn’t connected to an account.",
                  },
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              >
                <Input
                  className="input_root"
                  name="email"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  onChange={handleInputChange}
                />
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
                <Input.Password
                  name="password"
                  onChange={handleInputChange}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  className="boton"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Log In
                </Button>
                <Button
                  className="boton"
                  type="secondary"
                  htmlType="submit"
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="footer">
          <span className="login-footer-label">Password project 2023.</span>
        </div>
      </div>
      {/* imagen subir  */}
      <div className="total-login-images">
        <input type="file" className="total-login-images" />
        <button>Upload!</button>
      </div>
    </div>
  );
};

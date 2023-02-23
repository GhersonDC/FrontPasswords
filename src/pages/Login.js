import React, { useState } from "react";
import { Form, Input, Button, message, Upload, Image } from "antd";
import Cookies from "universal-cookie";
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "../aws-exports";
import { WebcamCapture } from "./CameraCapture";
import Signup from "./Signup";
import axios from 'axios';

Amplify.configure(awsExports);
Auth.configure(awsExports);

const cookies = new Cookies();

export const Login = () => {
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [jpeg64, setJpeg64] = useState("");
  //webcam
  const [catchImage, setcatchImage] = React.useState();

  const receiveImage = (catchImage) => {
    //for preview
    setcatchImage(catchImage);
    //for api gateway
    setJpeg64(catchImage.replace("data:image/jpeg;base64,", ""));
  };

  const api = 'https://cors-anywhere.herokuapp.com/https://71ctdrooxd.execute-api.us-east-1.amazonaws.com/prod/search-face';

  const handleSubmitLogin = (e) => {
    // e.preventDefault();
    const data = { "imgdata" : jpeg64 };
    axios
      .post(api, JSON.stringify(data),{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getData = async function signIn() {
    
    try {
      //aws amplify
      const user = await Auth.signIn(inputs.email, inputs.password);
      console.log(user.username);
      setLoading(false);
      if(user && handleSubmitLogin()){
        console.log('success');
        cookies.set("nombre", user.username, { secure: true, sameSite: "none" });
        localStorage.setItem("nombre", user.username);
        window.location.href = "./menu";
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
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
            <p className="main_name_menu"> System Auth </p>
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
                className="image_preview" 
                valuePropName="checked" >
                {!catchImage ? (
                  "Recuerda tomar fotografia para continuar"
                ) : (
                  
                  <Image  
                    className="space-align-block" 
                    width={100}
                    src={catchImage} 
                  />
                )}
              </Form.Item>
              <Form.Item>
                {!catchImage ? (
                  <Button className="boton" type="primary" disabled>
                    Login
                  </Button>
                ) : (
                  <Button
                    className="boton"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    // onClick={handleSubmitLogin}
                  >
                    Log In
                  </Button>
                )}

                <br />
                <Link to="/Signup" 
                  className="btn btn-primary link">
                  Sign up
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      {/* imagen subir  */}
      <div className="total-login-images">
        <WebcamCapture
          sendDataTo={receiveImage}
        />
      </div>
    </div>
  );
};

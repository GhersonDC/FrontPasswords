import {
  Button,
  Form,
  Input,
  Modal,
  message,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { WebcamCapture } from "./CameraCapture";
import React, { useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import { UserOutlined } from "@ant-design/icons";
import awsExports from "../aws-exports";
import "../index.css";

Amplify.configure(awsExports);
Auth.configure(awsExports);

export const Register = ({sendStatus}) => {
  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log(sendStatus = true)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
    profile: "",
  });

  const [loading, setLoading] = useState(false);

  const getNewData = async function signUp() {
    try {
      const { user } = await Auth.signUp(
        inputs.email,
        inputs.password,
        inputs.profile
      );
      setLoading(false);
      console.log(user);
    } catch (error) {
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
    <>
      <Form
        className="form_signup"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        // onValuesChange={onFormLayoutChange}
        onFinish={getNewData}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: 600,
        }}
      >
        <Form.Item label="Nombre:">
          <Input />
        </Form.Item>
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
        <Form.Item label="Fotografia">
          <Button onClick={()=> showModal()} >Agregar foto</Button>
          <Modal
            title="Agregacion de fotografia en coleccion"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <WebcamCapture />
          </Modal>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" loading={loading} htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

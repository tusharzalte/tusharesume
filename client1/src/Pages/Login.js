import React, { useEffect, useState } from "react";
import { Form, Input, Button,  message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../Resources/Stylesheets/authentication.css";
import Footer from "../Components/Footer";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await axios.post("api/user/login", values);
      message.success("Login successfull");
      localStorage.setItem("tusharresume-users", JSON.stringify(user.data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      message.error("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tusharresume-users")) {
      navigate("/home");
    }
  });

  return (
    <>
      <div className="authenticationParent">
        {loading && <Spin size="large" />}
        <h1 className="brand">Resume Builder</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <h1>Login</h1>
          <hr />
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div className="d-flex align-items-center justify-content-between mt-4">
            <Button className="button" type="primary" htmlType="submit">
              <Link to="/register">Register</Link>
            </Button>
            <Button className="button" type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Register;

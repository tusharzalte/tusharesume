import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";

import "../Resources/Stylesheets/authentication.css";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post("api/user/register", values);
      setLoading(false);
      message.success("Registration successfull");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed");
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
        <h1 className="brand">Resume Builder</h1>
        {loading && <Spin size="large" />}
        <Form layout="vertical" onFinish={onFinish}>
          <h1>Register</h1>
          <hr />
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <Form.Item name="confirmPassword" label="Confirm Password">
            <Input type="password" />
          </Form.Item>

          <div className="d-flex align-items-center justify-content-between mt-4">
            <Button className="button" type="primary" htmlType="submit">
              <Link to="/login">Login</Link>
            </Button>
            <Button className="button" type="primary" htmlType="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Register;

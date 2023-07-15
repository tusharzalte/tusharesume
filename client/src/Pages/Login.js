import React, { useEffect, useState } from "react";
import { Form, Input, Button,  message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../Resources/Stylesheets/authentication.css";
import Footer from "../Components/Footer";
import axios from "axios";

function Register() {
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const user = await axios.post("api/user/login", { ...values, captchaInput });
      message.success("Login successfull");
      localStorage.setItem("tusharresume-users", JSON.stringify(user.data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      message.error("Login failed");
    }
  };
  const captchahandler = async()=>{
    const response = await axios.get("/api/user/captcha");
    setCaptchaValue(response.data);
    setCaptchaInput("");

  }
  useEffect(() => {
    const fetchCaptcha = async () => {
      try {
        console.log("Fetching CAPTCHA...");
        const response = await axios.get("/api/user/captcha");
        console.log("CAPTCHA response:", response.data);
        setCaptchaValue(response.data);
      } catch (error) {
        console.error("Failed to fetch CAPTCHA", error);
      }
    };
  
    fetchCaptcha();
  }, []);
  
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
          <Form.Item label="CAPTCHA(Enter the below code to verify)">
          <div className="captcha-container">
  <span
    className="captcha-value"
    style={{
      display: "inline-block",
      padding: "6px 10px",
      fontSize: "18px",
      fontWeight: "bold",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      marginRight: "10px",
    }}
  >
    {captchaValue}
  </span>

  <Input
    className="captcha-input"
    value={captchaInput}
    onChange={(e) => setCaptchaInput(e.target.value)}
    style={{
      width: "100px",
      height: "40px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "6px 10px",
      fontSize: "16px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }}
  />
  <Button type="link" onClick={captchahandler} style={{ marginLeft: "10px" }}>
      Refresh
    </Button>
</div>

        </Form.Item>

          <div className="d-flex align-items-center justify-content-between mt-4">
            <Button className="button custom-btn btn-1" type="primary" htmlType="submit">
              <Link to="/register">Register</Link>
            </Button>
            <Button className="button custom-btn btn-1" type="primary" htmlType="submit">
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
